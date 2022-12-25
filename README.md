## Lulu online React store

![ezgif com-gif-maker (54)](https://user-images.githubusercontent.com/94214512/209457757-658e74fe-1c4e-46eb-aadb-69c9ac29cd53.gif)<br>
this is a simple online store that I created using REACT. <br>
[lulu-online-clothing-website](https://cozy-tartufo-7aa58d.netlify.app/)

### Goals of the project

1. Build components hierarchy and use React router for making a single page application
2. Login and logout through `GoogleAuthProvider` from firebase
3. Set, get, and remove data using firebase
4. Request a data change operation to the server using `useMutation` from React Query (`useQuery` vs `useMutation`)
5. Refactoring using custom hooks for maintainence and readability
6. Practice array APIs like map, split, sort etc...
7. Make a `ProtectedRoute` for pages which are required for user's information

### Languages

React, TailwindCSS

### Features

- **Build components hierarchy and use React router for making a single page application**

  ```js
  //index.js
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <NotFound></NotFound>,
      children: [
        { index: true, path: "/", element: <Home></Home> },
        { path: "/product/:items", element: <SaleProducts></SaleProducts> },
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

- **Login, logout through GoogleAuthProvider from firebase**<br>
  [Authenticate Using Google with JavaScript](https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0)
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

- **Set, get, remove the data using firebase** <br>
  [Read and Write Data on the Web](https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0) <br>

1. Add a new product<br>
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

2. Add to cart<br>
   ![ezgif com-gif-maker (57)](https://user-images.githubusercontent.com/94214512/209458763-761ff183-07c8-4f2c-864c-9353c5687840.gif)<br>
   ```js
   export async function addOrUpdateToCart(userId, product) {
     return set(ref(database, `carts/${userId}/${product.id}`), product);
   }
   ```
3. Remove<br>
   ![ezgif com-gif-maker (58)](https://user-images.githubusercontent.com/94214512/209458826-fa8f48b9-c499-43df-97ec-c77c6a11c368.gif)<br>
   ```js
   export async function removeFromCart(userId, productId) {
     return remove(ref(database, `carts/${userId}/${productId}`));
   }
   ```

- **Request a data change operation to the server using useMutation from React Query (useQuery vs useMutation)** <br>
  useQuery and useMutation were confusing at the beginning. After I studied and tested several code, I would simply say useQuery is for reading data, while useMutation is for updating data. <br>
  <br>
  **How to use useMutation**

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

**Use useMutation from this project**

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
const addOrUpdateItem = useMutation(
  (product) => addOrUpdateToCart(uid, product),
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  }
);
```

```js
//firebase.js
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
```

- **Refactoring using custom hooks for maintainence and readability**
  useQuery and useMutation were seperated in all different components before refactoring so whenever I tried to create a caching strategy, it was hard for me to figure it out all at once. And then I got the answer after reading this [create custom hooks](https://tkdodo.eu/blog/practical-react-query#create-custom-hooks).
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
