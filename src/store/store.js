import { createStore } from 'vuex';
import { auth, db } from '@/firebase';
import router from '@/router/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";

const store = createStore({
  state() {
    return {
      token: '',
      user: null,
      email: '',
      userId: ''
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
    setEmail(state, email){
      state.email = email;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async initAuth({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        const expirationDate = localStorage.getItem('expirationDate');
        const time = new Date().getTime();
        if (+expirationDate <= time) {
          dispatch('logout');
        } else {
          commit('setToken', token);
          const timerSecond = +expirationDate - time;
          dispatch('setTimeoutTimer', timerSecond);
          await dispatch('fetchUserData'); // Kullanıcı verilerini yükle
          router.push('/');
        }
      } else {
        router.push('/login'); // Oturum açma sayfasına yönlendir
      }
    },    
    async createGroup({ dispatch, state }, { groupName, groupDesc }) {
      if (!state.user || !state.user.userId) {
        throw new Error('User data is not available');
      }
    
      try {
        const groupRef = await addDoc(collection(db, 'groups'), {
          name: groupName,
          description: groupDesc,
          members: [state.user.userId]
        });
    
        const groupId = groupRef.id;
    
        await dispatch('joinGroup', groupId);
    
        return groupId; 
      } catch (error) {
        console.error('Error creating group:', error);
        throw error;
      }
    },        
    async joinGroup({ state }, groupId) {
      try {
        const userDocRef = doc(db, 'users', state.user.userId);
        await updateDoc(userDocRef, {
          groups: [...state.user.groups, groupId]
        });
      } catch (error) {
        console.error('Error joining group:', error);
        throw error;
      }
    },
    async login({ commit, dispatch }, authData) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, authData.email, authData.password);
        const token = await userCredential.user.getIdToken();
        commit('setToken', token);
        commit('setEmail', userCredential.user.email);
        commit('setUserId', userCredential.user.uid);
        localStorage.setItem('token', token);
        const expirationDate = new Date().getTime() + 3600 * 1000; // 1 hour
        localStorage.setItem('expirationDate', expirationDate);
        dispatch('setTimeoutTimer', 3600 * 1000);
        dispatch('fetchUserData');
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    async register({ commit }, authData) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
        const user = {
          email: authData.email,
          username: authData.username,
          userId: userCredential.user.uid
        };
        await setDoc(doc(db, 'users', userCredential.user.uid), user);
        commit('setUserId', userCredential.user.uid);
        commit('setUser', user);
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('clearToken');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      router.replace('/login');
    },
    setTimeoutTimer({ dispatch }, expiresIn) {
      setTimeout(() => {
        dispatch('logout');
      }, expiresIn);
    },
    async fetchUserData({ commit, state }) {
      if (!state.token) {
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', 'belge-id'));
        if (userDoc.exists()) {
          const user = userDoc.data();
          commit('setUser', user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== '';
    },
    user(state) {
      return state.user;
    }
  }
});

export default store;
