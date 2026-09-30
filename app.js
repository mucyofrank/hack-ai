const supabaseClient = window.supabase.createClient(
    "https://kjmpqazerqlfngfargpb.supabase.co",
    "YOUR_SUPABASE_PUBLISHABLE_KEY"
);

const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmit = document.getElementById("authSubmit");
const authMessage = document.getElementById("authMessage");
const switchAuth = document.getElementById("switchAuth");
const closeAuth = document.getElementById("closeAuth");

let isLogin = false;

function openAuth(loginMode) {
    isLogin = loginMode;

    authModal.classList.add("active");

    authMessage.textContent = "";

    if (isLogin) {
        authTitle.textContent = "LOGIN";
        authDescription.textContent = "Sign in to your HACKAI account.";
        authSubmit.textContent = "LOGIN";
        switchAuth.textContent = "Don't have an account? SIGN UP";
    } else {
        authTitle.textContent = "CREATE ACCOUNT";
        authDescription.textContent = "Create your HACKAI account.";
        authSubmit.textContent = "CREATE ACCOUNT";
        switchAuth.textContent = "Already have an account? LOGIN";
    }
}

document.getElementById("loginBtn").addEventListener("click", () => {
    openAuth(true);
});

document.getElementById("signupBtn").addEventListener("click", () => {
    openAuth(false);
});

document.getElementById("heroLogin").addEventListener("click", () => {
    openAuth(true);
});

document.getElementById("heroSignup").addEventListener("click", () => {
    openAuth(false);
});

closeAuth.addEventListener("click", () => {
    authModal.classList.remove("active");
});

switchAuth.addEventListener("click", () => {
    openAuth(!isLogin);
});

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    authSubmit.disabled = true;
    authSubmit.textContent = "PLEASE WAIT...";
    authMessage.textContent = "";

    try {

        if (isLogin) {

            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw error;
            }

            authMessage.textContent = "LOGIN SUCCESSFUL.";

        } else {

            const { error } = await supabaseClient.auth.signUp({
                email,
                password
            });

            if (error) {
                throw error;
            }

            authMessage.textContent =
                "ACCOUNT CREATED. CHECK YOUR EMAIL TO CONFIRM.";

        }

    } catch (error) {

        authMessage.textContent = error.message;

    }

    authSubmit.disabled = false;
    authSubmit.textContent = isLogin
        ? "LOGIN"
        : "CREATE ACCOUNT";
});