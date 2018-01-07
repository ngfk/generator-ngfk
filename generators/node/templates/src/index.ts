const main = () => {
    console.log('hello world!');
};

(() => require.main === module && main())();
