
/* const loadUserFetch = () => {

    const url = 'https://jsonplaceholder.typicode.com/users';

    fetch(url)
        .then(res => res.json())  //promise
        .then(data => console.log(data))
        .catch(error => console.log(error);)

} */



const loadUserAsync = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}



/* console.log(1);
setTimeout(() => {
    console.log(2);
}, 5000);

console.log(3);

// 2 er jonno baki gula await korbe tahole - > async */





