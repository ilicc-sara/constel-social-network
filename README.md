# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

https://constel-social-network-nemanjamalesija.vercel.app/
malesija.nemanja@gmail.com
He5r4dOVdy9x6IT

<i className="bxr  bx-heart"></i>
<i className="bxr  bxs-heart"></i>
<i className="bxr  bx-message-bubble-reply"></i>
<i className="bxr  bxs-message-bubble-reply"></i>

<i className="bxr  bx-calendar"></i>
<i className="bxr  bx-trash"></i>

const audioRef = useRef<HTMLDivElement | null>(null);

<button
              className="bg-red-600 text-white text-sm !px-2 !py-1 rounded w-[fit-content]"
              onClick={recorderControls.stopRecording}
            >
Stop recording
</button>

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```
 useEffect(() => {
    const token = localStorage.getItem("sb-yyocycmzxqjdvkwqlpzd-auth-token");
    if (token) {
      setUserId(JSON.parse(token).jwt);
    } else {
      console.error();
      navigate("/login");
    }
  }, []);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGE0OGEyYjMtZjY2MC00YjIwLWEyNjEtYzllZjE1YzI4NmY3IiwiaWF0IjoxNzcxMzQxMzc3fQ.VqQH-_OR-Ton_-sHeletFnth_Zolto944qTERSSohGQ";
  console.log("user id:", userId);
  console.log("token:", token);
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```
useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          "https://api.hr.constel.co/api/v1/accounts/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const user = await userResponse.json();
        setUser(user.account);

        console.log("user response", user);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPosts = async () => {
      try {
        const postResponse = await fetch(
          "https://api.hr.constel.co/api/v1/posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const posts = await postResponse.json();

        console.log("posts response", posts);
        setPosts(posts.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    setNewAudioSrc(url);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(inputPost);
  };

  const handleDeleteAudio = () => {
    if (newAudioSrc) {
      URL.revokeObjectURL(newAudioSrc);
    }

    setNewAudioSrc(null);
  };
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```// useEffect(() => {
  //   const response = await fetch("https://api.hr.constel.co/api/v1/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ 'malesija.nemanja@gmail.com', 'He5r4dOVdy9x6IT' }),
  //   });

  //   const data = await response.json();
  //   localStorage.setItem("token", data.token); // Store token

  //   // Subsequent request
  //   const protectedData = await fetch(
  //     "https://api.hr.constel.co/api/v1/posts",
  //     {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     },
  //   );
  // }, []);

  // useEffect(() => {
  //   const logIn = async () => {
  //     try {
  //       const userResponse = await fetch(
  //         "https://api.hr.constel.co/api/v1/login",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             email: "malesija.nemanja@gmail.com",
  //             password: "He5r4dOVdy9x6IT",
  //           }),
  //         },
  //       );
  //       const data = await userResponse.json();
  //       localStorage.setItem("token", data.token); // Store token

  //       console.log("ma ima da ga napravim", data);

  //       // Subsequent request
  //       // const protectedData = await fetch(
  //       //   "https://api.hr.constel.co/api/v1/posts",
  //       //   {
  //       //     headers: {
  //       //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       //     },
  //       //   },
  //       // );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   logIn();
  // }, []);
```

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

```const handleLogOut = async () => {
    try {
      const userResponse = await fetch(
        "https://api.hr.constel.co/api/v1/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await userResponse.json();
      localStorage.setItem("token", data.token); // Store token

      console.log("", data);

      // Subsequent request
      // const protectedData = await fetch(
      //   "https://api.hr.constel.co/api/v1/posts",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   },
      // );
    } catch (err) {
      console.error(err);
    }
  };
```
