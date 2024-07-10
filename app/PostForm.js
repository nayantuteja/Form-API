
'use client';
import React, { useState, useEffect } from "react";

const PostForm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [cpu_model, setCPU_model] = useState("");
  const [hdd, setHDD] = useState("");
  const [posts, setPosts] = useState([]);
  // const [lastPostId, setLastPostId] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          "data": {
            "year": year,
            "price": price,
            "CPU model": cpu_model,
            "Hard disk size": hdd
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const data = await response.json();

      if (data) {
        console.log("Post created:", data);
        setPosts([...posts, data]);
        // setLastPostId(data.id);

        setName("");
        setYear("");
        setPrice("");
        setCPU_model("");
        setHDD("");
      } else {
        console.error("No data received from the API.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
     console.log("Deleted ID:",id)
      setPosts(posts.filter((post) => post.id !== id));

    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="year">Year: </label>
        <input
          type="number"
          min="0"
          max="9999"
          className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="cpu_model">CPU:</label>
        <input
          id="cpu_model"
          className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          value={cpu_model}
          onChange={(e) => setCPU_model(e.target.value)}
        />

        <label htmlFor="hdd">HDD:</label>
        <input
          id="hdd"
          className='rounded-lg w-1/8 bg-white text-black m-2 p-2 shadow-m'
          value={hdd}
          onChange={(e) => setHDD(e.target.value)}
        />

        <button className="bg-blue-500 w-28 h-10 rounded-full " type="submit">
          Create Post
        </button>
      </form>

      <div className="mt-4">
        <h2>Posted Objects:</h2>
        <ul>
          {posts.map((post) => (
            post.data && (
              <li key={post.id}>
                <strong>{post.name}</strong> - {post.data.year}
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
export default PostForm;




