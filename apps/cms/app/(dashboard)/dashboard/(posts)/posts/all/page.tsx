import { PostsLists } from "@/components/page/posts/all/postsLists";
import { getPosts } from "@/lib/actions/posts";

export default async function AllPostsPage() {
  const posts = await getPosts();
  return <PostsLists posts={posts} />;
}
