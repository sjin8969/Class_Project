import React, { useState, useEffect } from "react";
import '../css/Board.css';

function Board() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [
      { id: 1, title: "첫 번째 글", author: "사용자1", content: "첫 번째 글 내용", date: "2023-12-01" },
      { id: 2, title: "두 번째 글", author: "사용자2", content: "두 번째 글 내용", date: "2023-12-02" },
      { id: 3, title: "세 번째 글", author: "사용자3", content: "세 번째 글 내용", date: "2023-12-03" },
    ];
  });

  const [CreatePost, setCreatePost] = useState({
    title: "",
    author: "",
    content: "",
    date: "",
  });

  const [isWriting, setIsWriting] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatePost({
      ...CreatePost,
      [name]: value,
    });
  };

  const handleAddPost = () => {
    if (CreatePost.title && CreatePost.author && CreatePost.content) {
      const newId = posts.length + 1;
      const updatedPosts = [...posts, { id: newId, ...CreatePost, date: new Date().toISOString().slice(0, 10) }];
      setPosts(updatedPosts);
      setCreatePost({
        title: "",
        author: "",
        content: "",
        date: "",
      });
      setIsWriting(false);
    } else {
      alert("제목, 작성자, 내용을 입력하세요!");
    }
  };

  const handleToggleWriting = () => {
    setIsWriting((prevIsWriting) => !prevIsWriting);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    if(window.confirm("정말 삭제하시겠습니까?")){
      alert("삭제되었습니다.");
      setPosts(updatedPosts);
    }
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="board">
      <h2>게시판</h2>
      {isWriting ? (
        <div>
          <h3>새 글 작성</h3>
          <label>
            제목
            <input
              type="text"
              name="title"
              value={CreatePost.title}
              onChange={handleInputChange}
              placeholder="제목"
              className="TitleCommunity"
            />
          </label>
          <label>
            작성자
            <input
              type="text"
              name="author"
              value={CreatePost.author}
              onChange={handleInputChange}
              placeholder="작성자"
              className="CreateUser"
            />
          </label>
          <label>
            <textarea
              name="content"
              value={CreatePost.content}
              onChange={handleInputChange}
              placeholder="내용을 입력해주세요"
              className="Content"
            />
          </label>
          <button onClick={handleAddPost} className="PostContents">글 올리기</button>
        </div>
      ) : selectedPost ? (
        <PostDetail post={selectedPost} onBack={handleBack} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="titlebutton" onClick={() => handlePostClick(post)}>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDeletePost(post.id)} >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isWriting && !selectedPost && (
        <button onClick={handleToggleWriting} className="WriteContents">글쓰기</button>
      )}
    </div>
  );
}

function PostDetail({ post, onBack }) {
  return (
    <div className="DetailPageAll">
      <h3 className="DetailElement">제목 : {post.title}</h3>
      <p className="DetailAuthor">작성자: {post.author}</p>
      <p className="DetailContents">{post.content}</p>
      <p className="Date">작성날짜 : {new Date(post.date).toLocaleDateString()}</p>
      <button onClick={onBack}>뒤로 가기</button>
    </div>
  );
}

export default Board;
