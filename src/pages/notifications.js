// pages/somePage.js
export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/notifications`, {
      headers: {
        // Headers for authentication if needed
      },
    });
    const data = await res.json();
  
    return {
      props: { notifications: data }, // will be passed to the page component as props
    };
  }
  
  function Page({ notifications }) {
    // Render your page with the notifications data
  }
  
  export default Page;
  