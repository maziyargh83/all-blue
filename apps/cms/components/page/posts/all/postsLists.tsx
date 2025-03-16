import { Post } from "@all-blue/lib";

interface PostsListsProps {
  posts: Post[];
}
export const PostsLists = ({ posts }: PostsListsProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
