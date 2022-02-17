export const getDadata = adress => {
    console.log('start');
    let result = 'sd';
    let data = new FormData();

    data.append('adress', adress);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'getDadata.php');
    xhr.onload = (res) => console.log(res.target.response);
    xhr.send(data);
    return result;
}