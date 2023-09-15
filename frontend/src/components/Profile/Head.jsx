import React from 'react';

const Head = () => {
  return (
    <div className='border-b-2 border-blue-gray-900 flex justify-center items-center h-64'>
      <div className='flex flex-col items-center ms-48'>
        <img
          src="C:\\Users\\Aromal\\Downloads\\mammootty-stills-photos-pictures-28.jpg"
          alt="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg/330px-Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"
          className='h-27 w-28 me-16'
        ></img>
        <p>name</p>
      </div>
      <div>
        <div className='flex justify-evenly mb-9 ml-24'>
          <p className='me-10 ml-1'>aro_m_l</p>
          <button className='bg-custom-500 me-5 ml-10 '>edit profile</button>
          <div className='me-7'>
          <button><div className='bg-custom-500 me-16 ml-10 '>archive</div></button>
          </div>
          
        </div>
        <div className='flex justify-evenly mb-10  ml-24'>
          <p className='me-16 ml-10'>1 posts</p>
          <p className='me-16 ml-12'>2 followers</p>
          <p className='me-16 ml-12'>3 following</p>
        </div>
      </div>
    </div>
  );
};

export default Head;
