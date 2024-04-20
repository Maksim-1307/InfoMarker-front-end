function UploadButton(data){
    data = data.data;

    console.log(data.onChange);
    return (
        <form action={data.action} method={data.post} encType={data.enctype}>
            <input type="file" id={data.inputId} name={data.inputName} onChange={data.onChange} />
            <label className={data.labelClass} htmlFor={data.inputId}>{data.labelText}</label>
        </form>
    );
}

export default UploadButton;