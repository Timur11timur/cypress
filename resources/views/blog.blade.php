<x-layout>
    All Posts title:
    @foreach($posts as $post)
        <div>
            <h1>{{ $post->title }}</h1>
        </div>
    @endforeach
    <div id="posts"></div>
</x-layout>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js" integrity="sha512-odNmoc1XJy5x1TMVMdC7EMs3IVdItLPlCeL5vSUPN2llYKMJ2eByTTAIiiuqLg+GdNr9hF6z81p27DArRFKT7A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="application/javascript">
    let posts = document.getElementById('posts');
    if (posts) {
        axios.get('posts')
            .then(response => {
                response.data.forEach(post => {
                    let h2 = document.createElement('h2');
                    h2.innerText = post.title;
                    posts.appendChild(h2);
                });
            });
    }
</script>

