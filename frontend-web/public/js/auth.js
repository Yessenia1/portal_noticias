// This file was previously deleted by the model and is now being restored.

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    app,
    db
} from './firebase-config.js'; // Asegúrate de que esta ruta sea correcta

const auth = getAuth(app);

// Referencias DOM
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const authActions = document.getElementById('auth-actions');

// Funciones de utilidad para mostrar/ocultar el modal
export function showAuthModal(showRegister = false) {
    authSection.classList.remove('hidden');
    authSection.classList.add('flex'); // Asume que flex es para centrar
    
    if (showRegister) {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }
    loginError.classList.add('hidden');
    registerError.classList.add('hidden');
}

export function hideAuthModal() {
    authSection.classList.add('hidden');
    authSection.classList.remove('flex');
}

// Event Listeners para cambiar entre login y registro
document.getElementById('close-auth-btn')?.addEventListener('click', hideAuthModal);

document.getElementById('switch-to-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthModal(true);
});

document.getElementById('switch-to-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    showAuthModal(false);
});

// Manejo de Registro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerError.classList.add('hidden');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            is_premium: false,
            created_at: new Date()
        });
        
        hideAuthModal();
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    } catch (error) {
        console.error("Error de registro:", error);
        registerError.textContent = `Error: ${error.message}`;
        registerError.classList.remove('hidden');
    }
});

// Manejo de Inicio de Sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginError.classList.add('hidden');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        hideAuthModal();
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        loginError.textContent = `Error: ${error.message}`;
        loginError.classList.remove('hidden');
    }
});

// Manejo de Cierre de Sesión (expuesto para ser usado desde updateUIForUser)
export function handleLogout() {
    signOut(auth).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}

// Observador de estado de autenticación (se mantiene aquí, pero la lógica de UI en main.js o similar)
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Usuario autenticado:", user.email);
        // Aquí podrías querer llamar a una función en main.js para actualizar la UI
        // Por ahora, solo un log
    } else {
        console.log("Usuario no autenticado.");
    }
});