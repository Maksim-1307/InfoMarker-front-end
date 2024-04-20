import axios from 'axios'

function submitFile(file, url) {
    console.log('the file: ', file);
    //event.preventDefault()
    //const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    axios.post(url, formData, config).then((response) => {
        console.log('RESPONSE: ', response.data);
    });

}

export default submitFile;