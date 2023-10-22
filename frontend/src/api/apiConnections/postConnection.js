


import baseURL from "../api";

export const addPost = async (userName, selectedfile, caption,userId) => {
  try {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("selectedfile", selectedfile);
    formData.append("caption", caption);
    formData.append("userid",userId)
    console.log(formData,"connection");
    const response = await baseURL.post("post/addpost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.log(error, "544444444445555555555562345");
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

export const postReport=async(postId,postedUsername,userId,selectedOption)=>{
  try{
    const response=await baseURL.post('post/reportpost',{postId,postedUsername,userId,selectedOption})
    return response
  }catch(error)
  {
    console.log(error);
  }
}

export const  singleuserPost=async (userId)=>{
  try{
    const response=await baseURL.get(`/post/singleuserpost/${userId}`)
    return response.data
  }catch(error)
  {
      console.log(error,"444444444234567");
  }
}



export const deletePosts=async(postId)=>{
  try{
const response=await baseURL.delete(`/post/deletepost/${postId}`)
return response.data
  }catch(error)
  {
console.log(error);
  }
}

export const addComment=async(  postId,
  userId,
  userName,
  comment,

commented,
  commentId)=>{
  try{
    console.log(postId,userId,comment,commentId,"11111133333333333333333333333connect");
const response=await baseURL.post(`/post/addcomment`,{postId,userId,userName,comment,commented,commentId})
console.log(response,'addcomment');
return response.data
  }catch(error)
  {
    console.log(error);
  }
}

export const getComments=async (postId)=>{
  try{
const response=await baseURL.post(`/post/getComment`,{postId})
console.log(response,'getCommemt');
return response.data
  }catch(error)
  {
    console.log(error);
  }
}

export const commentsSize=async(postId)=>{
  try{
 const response=await baseURL.post(`/post/commentsize`,{postId})
 return response.data
  } catch(error)
  {
    console.log(error );
  }
}

export const deleteComments=async(commentId)=>{
  try {

    const response=await baseURL.post(`post/removecomment`,{commentId})
return response.data
  } catch(error)
  {
      console.log(error)
  }
}

export const editComments=async(commentId,comment)=>{

  try{
const response=await baseURL.post(`post/editComment`,{commentId,comment})
console.log(response.data,"77777777555555555553333333333");
return response.data
  }catch(error)
  {
    console.log(error);
  }
}







