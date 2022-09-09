
// category data
const categoryurl= 'https://dummyjson.com/products/categories'
fetch(categoryurl)
.then(response=>response.json())
.then(categoryData=>{
    categoryfunction(categoryData)
})

const categoryfunction = categoryData =>{
    for(const category in categoryData){
        
        const categoryparentdiv = document.getElementById('category')
        const categorylist = `<!-- category item  -->
                                <li class="pt-2">
                                    <a class="text-blue fw-bold d-flex justify-content-between" href="">
                                        <span class="text-uppercase">${categoryData[category]}</span>
                                        <i class="fa-solid fa-angle-down border border-2 border-dark rounded-circle p-1"></i>
                                    </a>
                                </li>
                                <!-- category item end -->`
        categoryparentdiv.innerHTML += categorylist
    }

}