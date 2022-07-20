const body = document.querySelector('body');

async function drawDiv() {
    async function getJson() {
        let a = await fetch('http://localhost:3000/posts')
            .then(async (response) => {   
                return await response.json()
            })
            .then(async (data) => {
                return await data;
            })
        
        return a
    }
    
    const data = await getJson();

    for await (let elem of data)  {
        const div = document.createElement('div');
        div.className = `id-${elem.id}`;
        div.innerHTML = `
            <p>title: ${elem.title}</p>
            <p>author: ${elem.author}</p>
        `
        body.append(div)
    }
}
drawDiv()

// загрузка данных на сервер

const submitButton = document.querySelector('.submitButton');

submitButton.addEventListener('click', (e) => {
    const title = document.querySelector('.title');
    const author = document.querySelector('.author');
    if (title.value.length <= 0 || author.value.length <= 0) {
        return
    } else {
        e.preventDefault;
        ft3(title, author)
    }
})

async function ft3(title, author) {
    const obj = {
        title: title.value,
        author: author.value
    };

    try {
        const res = await fetch('http://localhost:3000/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const result = await res.json();
        console.log('Успех:', JSON.stringify(result));
    } catch (error) {
        console.error('Ошибка:', error);
    }
}