## Lulu online React store

![ezgif com-gif-maker (54)](https://user-images.githubusercontent.com/94214512/209457757-658e74fe-1c4e-46eb-aadb-69c9ac29cd53.gif)<br>
this is a simple online store that I created using REACT. <br>
[lulu-online-clothing-website](https://cozy-tartufo-7aa58d.netlify.app/)

### Goals of the project

1. Build components hierarchy and use React router for making a single page application
2. Login and logout through `GoogleAuthProvider` from firebase
3. Set, get, and remove data using firebase
4. Request a data change operation to the server using `useMutation` , `invalidateQueries` from React Query (`useQuery` vs `useMutation`)
5. Refactoring using custom hooks for maintainence and readability
6. Practice array APIs like map, split, sort etc...
7. Make a `ProtectedRoute` for pages which are required for user's information

### Languages

React, TailwindCSS

### Features

**1. Build components hierarchy and use React router for making a single page application**
![lulu2](https://user-images.githubusercontent.com/94214512/210153387-3e661001-5cf5-418f-a6bd-bc14e0877ca5.png)<br>

- Add a router for making a single page application in index.js

  ```js
  //index.js
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <NotFound></NotFound>,
      children: [
        { index: true, path: "/", element: <Home></Home> },
        { path: "/product/:items", element: <ShopProducts></ShopProducts> },
        {
          path: "/products/new",
          element: (
            <ProtectedRoute requireAdmin={true}>
              <NewProduct></NewProduct>
            </ProtectedRoute>
          ),
        },
        { path: "/products/:id", element: <ProductDetail></ProductDetail> },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Mycart></Mycart>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  ```

- Each component/page represents: <br>
  1. App : top level element
  2. Navbar : this navbar includes a mini-banner, logo, side toggle menu bar, cart icon, pencil icon that you can add a new product as an admin, and user login/logout
  3. Outlet : children route elements
  4. Home : main home page
  5. ShopProducts : display products according to the user's click from side toggle menu bar (women, men, saleItem, and gift)
  6. NewProduct : only the admin user is allowed to access and add a new product
  7. ProtectedRoute : for protecting some specific routes which require the user's information
  8. productDetail : show the product's details after the user clicks on it
  9. Mycart : only a logged in user is allowed to access and see the product list that they added from product detail page

**2. Login, logout through GoogleAuthProvider from firebase** <br>
[Authenticate Using Google with JavaScript](https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0)<br>
![ezgif com-gif-maker (55)](https://user-images.githubusercontent.com/94214512/209458548-a8a5c255-6950-4d72-898e-03894470e81a.gif)

```js
//Read login,logout,adminrole
export function login() {
  signInWithPopup(auth, provider).then((result) => {
    return console.log(result);
  });
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}
```

**_Realtime Database security rules_**<br>
While working on my lulu project, I was emailed by firebase about changing realtime database security rules. Otherwise they would start denying client requests. I was a little bit confused on how to figure it out, but it was easier than I thought after reading firebase's official documentation [Avoid insecure rules](https://firebase.google.com/docs/rules/insecure-rules)<br>

```js
{
 //lulu is an online shopping website so regardless of registration, anyone can be allowed to see the products
 // on the other hand, writing is only allowed for someone who registered and shared their uid. so that they can have their own cart data.
  "rules": {
    ".read": true,
    ".write": "auth.uid !== null"
  }
}
```

If you have modified your security rules in the last 24 hours, the changes may not be reflected immediately. In my case, as soon as I got the warning message at the first time, I changed it around 2 hours later and then had exactly the same warning message again the next day. That made me worried but after 24 hours of changes, I stopped getting the warning.

**3. Set, get, remove the data using firebase** <br>
[Read and Write Data on the Web](https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0) <br>

- Add a new product<br>
  ![ezgif com-gif-maker (56)](https://user-images.githubusercontent.com/94214512/209458694-bac38751-12cf-4450-90e2-5588c304672f.gif)<br>

  ```js
  export async function addNewProduct(product, image) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
      ...product,
      id,
      price: parseInt(product.price),
      image: image,
      colors: product.colors.split(","),
      options: product.options.split(","),
    });
  }
  ```

- Add to cart<br>
  ![ezgif com-gif-maker (57)](https://user-images.githubusercontent.com/94214512/209458763-761ff183-07c8-4f2c-864c-9353c5687840.gif)<br>
  ```js
  export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
  }
  ```
- Remove<br>
  ![ezgif com-gif-maker (58)](https://user-images.githubusercontent.com/94214512/209458826-fa8f48b9-c499-43df-97ec-c77c6a11c368.gif)<br>
  ```js
  export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
  }
  ```

**4. Request a data change operation to the server using useMutation from React Query (useQuery vs useMutation)** <br>
useQuery and useMutation were confusing at the beginning. After I studied and tested several code, I would simply say useQuery is for reading data, while useMutation is for updating data. <br>
<br>

- **How to use useMutation**

```js
//1)mutationFn : promise (normally request API to the server here)
const saveData = useMutation({
    mutationFn: mutationFn
})

//2.mutate : trigger to execute the function
const handleClick = ()=>{
    savaData.mutate(data) //save data
}

//3. onSuccess, onError, onSettled : side effect, additional action (similar to try, catch, finally from async/await)
const saveData = useMutation((data) => axios.post('http://localhost:8080/saveData', data), {
    onSuccess: () => { // 요청이 성공한 경우
        console.log('onSuccess');
    },
}
```

- **Use useMutation from this project**

```js
//ProductDetails.jsx
//1. click the 'add to cart' button
//2. transfer the argument (which is finalProduct) to addOrUpdateItem from useCart and execute
//3. addOrUpdateToCart(userId,product) from firebase will be executing
//4. show success message!

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();

  const handleClick = () => {
    addOrUpdateItem.mutate(finalProduct, {
      onSuccess: () => {
        cogoToast.success("added in your cart successfully!");
      },
      onError: () => {
        if (!user) {
          cogoToast.error("please login to add to cart!");
        }
      },
    });
  };

  return (
    //code..
    <Button text="Add to Cart" onClick={handleClick}></Button>
  );
}
```

```js
//useCart.jsx
const queryClient = useQueryClient();

const addOrUpdateItem = useMutation(
  (product) => addOrUpdateToCart(uid, product),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  }
);
```

**_invalidateQueries_** <br>
invalidateQueries is used for the purpose of removing the validity of the queryKey used in useQuery. And the reason for removing the validity of the queryKey is to retrieve the data from the server again.

```js
//firebase.js
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
```

**5. Refactoring using custom hooks for maintainence and readability**<br>
useQuery and useMutation were separated in all different components before refactoring so whenever I tried to create a caching strategy, it was hard for me to figure it out all at once. And then I got the answer after reading this [create custom hooks](https://tkdodo.eu/blog/practical-react-query#create-custom-hooks).
Making custom hooks really helps with managing data in one place and makes for cleaner code by getting away from the UI logic.

```js
//former NewProduct.jsx page
export default function NewProduct() {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            setSuccess('New product added successfully!');
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };
  return(
    //code...
  )
}
```

```js
// former products.jsx page
export default function Products() {
 const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], getProducts);
  return (
    //code...
  )
}
```

```js
//after refactoring useProducts.jsx
export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60,
  }); //{isLoading, error, data:products}
  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      }, // if it gets successfully then invalidate cache
    }
  );
  return { productsQuery, addProduct };
}
```

**Make a ProtectedRoute for pages which are required for user's information**<br>
There are two routes that require a user's uid or admin status to access which are 'Mycart' and 'Add a new product.' If someone tries to access these routes without the right credentials then the user will be redirected to the home page.
A problem I was experiencing was that even though I had a valid uid and admin status, I was being redirected to the home page. I started debugging with console.log everywhere and figured out that the initial user's information from AuthContext.jsx was not there, it was returning undefined and then get the user's info so the ProtectedRoute oviously considered undefined as false so the redirect happened. I kept thinking about how to store the initial value regardless of re-rendering then I thought to use LocalStorage that I've learned from the todolist project. I was also bothered about the fact that whenever I clicked the refresh button, there was a brief moment that the login UI changed from logout first then to login due to the time that it needs to get the data from firebase. This problem was solved thanks to localStorage!

```js
//ProtectedRoute.jsx
export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}
```

```js
//AuthContext.jsx
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    return readUserFromLocalStorage();
  });
  useEffect(() => {
    onUserStateChange((user) => {
      return setUser(user);
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login: login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function readUserFromLocalStorage() {
  const userInfo = localStorage.getItem("user");
  return userInfo ? JSON.parse(userInfo) : null;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
```

### Reference Links

[Firebase-Authentication-web-google](https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0)<br>
[Firebase-RealtimeDatabase-web-Read and Write Data](https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0)<br>
[Create custom hooks](https://tkdodo.eu/blog/practical-react-query#create-custom-hooks)<br>
[Cloudinary for managing image size](https://cloudinary.com/)<br>
[useMutation from reactQuery](https://tanstack.com/query/v4/docs/react/guides/mutations)<br>
[tailwindcss](https://tailwindcss.com/docs/installation)<br>
[Cogo Toast Libraray](https://cogoport.github.io/cogo-toast/)<br>
[Valentino website for product photos and text](https://www.valentino.com/en-us/)<br>
[mdn-split for \r\n](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)<br>
[dreamcoding](https://academy.dream-coding.com/)
[how to use useMutation](https://jforj.tistory.com/244)

### Self-reflection

I enjoyed being able to apply everything that I have learned about React such as set/get database, React hooks, useQuery...etc. I realized how important planning is before starting to actually code, like how components should be divided for reusability and options for setting the data. I knew this earlier due to other React projects but the more I have ideas and create functions in the middle of this project, the more I regret that I should have planned it out ealier so that I could avoid constantly changing code that I made at the beginning. I encountered so many errors but really appreciate eslint! It saved a lot of time. There are so many great ideas for making this project better and better code through refactoring. I will always learn and keep practicing and testing!
