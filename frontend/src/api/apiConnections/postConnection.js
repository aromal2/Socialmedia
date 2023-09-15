
import baseURL from "../api";

export const addPost = async (userName, selectedfile, caption,userId) => {
  try {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("selectedfile", selectedfile);
    formData.append("caption", caption);
    formData.append("userid",userId)
    const response = await baseURL.post("post/addpost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.log(error, "544444444445555555555562345");
  }
};

export const getAllposts = async () => {
  try {
    const response = await baseURL.get(`post/getpost`);
    return response.data;
  } catch (error) {
    console.log(error, "errror in getAllpost");
  }
};


export const likePost =async (postId,userName) =>{
    try {

        const response = await baseURL.post('post/likePost',{postId,userName})
       return response
    } catch (error)
    {

    }
}

export const unlikePost =async (postId,userName) =>{
    try {

        const response = await baseURL.post('post/unlikepost',{postId,userName})
        return response

    } catch (error)
    {
               console.log(error,"iiiiiiiiiiiiiiii");
    }
}


export const listuser=async()=>{
  try {
    const response=await baseURL.get('post/listuser')
return response
  }catch(error)
  {
console.log(error);
  }
}

export const postReport=async(postId,userId,selectedOption)=>{
  try{
    const response=await baseURL.post('post/reportpost',{postId,userId,selectedOption})
    return response
  }catch(error)
  {
    console.log(error);
  }
}




