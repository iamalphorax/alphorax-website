import { getAllBlogs } from './lib/blogs';

async function run() {
    try {
        const blogs = await getAllBlogs();
        console.log("Found", blogs.length, "blogs");
        for (const b of blogs) {
            console.log(b.id, b.date);
        }
    } catch(e) {
        console.error(e);
    }
}
run();
