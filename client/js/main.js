const getData = async () => {
  const res = await axios
    .get('https://google.com', { header: 'Access-Control-Allow-Origin: *' })
    .then(res => res.json);
  console.log(res);
};

getData();
