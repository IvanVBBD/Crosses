const baseUrlRedirect = window.location.href.split("/").slice(0, 3).join("/");

const redirect = async () =>{
    
    
    try{
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token') || null;
        if(!token){
            token = localStorage.getItem('jwtToken')
        }
        if (token !== null) {
            const url = "/Game"
            window.location.href=`${url}?token=${token}`
    }
    }catch(e){
        console.log(e);
    }
    
}

redirect();


