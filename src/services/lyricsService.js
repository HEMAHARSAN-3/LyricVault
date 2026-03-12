import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const lyricsService = {
  // Add a new song
  async addLyric(title, lyricsText, userId) {
    try {
      const docRef = await addDoc(collection(db, 'lyrics'), {
        title: title.trim(),
        lyricsText: lyricsText.trim(),
        userId: userId,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Get all songs for a specific user
  async getUserLyrics(userId) {
    try {
      const q = query(
        collection(db, 'lyrics'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const lyrics = [];
      querySnapshot.forEach((doc) => {
        lyrics.push({ id: doc.id, ...doc.data() });
      });
      // Sort client-side to avoid needing a composite index
      return lyrics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      throw error;
    }
  },

  // Get a single song by ID
  async getLyricById(lyricId) {
    try {
      const docRef = doc(db, 'lyrics', lyricId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      throw error;
    }
  },

  // Update a song
  async updateLyric(lyricId, title, lyricsText) {
    try {
      const docRef = doc(db, 'lyrics', lyricId);
      await updateDoc(docRef, {
        title: title.trim(),
        lyricsText: lyricsText.trim(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete a song
  async deleteLyric(lyricId) {
    try {
      const docRef = doc(db, 'lyrics', lyricId);
      await deleteDoc(docRef);
    } catch (error) {
       throw error;
    }
  }
};
