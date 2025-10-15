"use client";

import BlogListClient from "../BlogListClient";

import type { BlogPostData } from "../BlogListClient";

const posts: BlogPostData[] = []; // TODO: Replace with data fetched from an API route or static props

export default function BlogPage() {
  return <BlogListClient posts={posts} />;
}
