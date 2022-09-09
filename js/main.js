// shimmer loader make skeleton here
var displayProduct = 5;
$('#results').html(createSkeleton(displayProduct));

function createSkeleton(limit){
    var skeletonHTML = '';
    for(var i = 0; i < limit; i++){
      skeletonHTML += '<div class="ph-item">';
      skeletonHTML += '<div class="ph-col-4">';
      skeletonHTML += '<div class="ph-picture"></div>';
      skeletonHTML += '</div>';
      skeletonHTML += '<div>';
      skeletonHTML += '<div class="ph-row">';
      skeletonHTML += '<div class="ph-col-12 big"></div>';
      skeletonHTML += '<div class="ph-col-12"></div>';
      skeletonHTML += '<div class="ph-col-12"></div>';
      skeletonHTML += '<div class="ph-col-12"></div>';
      skeletonHTML += '<div class="ph-col-12"></div>';
      skeletonHTML += '</div>';
      skeletonHTML += '</div>';
      skeletonHTML += '</div>';
    }
    return skeletonHTML;
  }

// shimmer loading pre structure
const template = `<div class="content"> 
<div class="container-fluid">	
    <div class="card">
        <div class="card-header">Product List</div>			
        <div class="card-body" id="results"> 			
        </div>		
    </div>			 
</div> 
</div>`

// for default loading shimmer effect
    $('#post-item').html(template);
    var displayProduct = 5;
    $('#results').html(createSkeleton(displayProduct));
  setTimeout(function(){
    loadProducts();
  }, 2000);


  function loadProducts(){

    // All post here
  
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        let postdiv = ""
        for(let key in data.products){
            
            // 5 post items added in the list
            if(key<5){
                let posts = data.products[key]

                

                // const postdiv = document.getElementById('post-item')
                
                let post = `<!-- post item start -->
                                <div class="row post-item p-2">
                                    <div class="col-xl-4 col-md-4 col-sm-4 col-12 post-image">
                                        <img class="w-100 h-100 rounded" src="${posts.thumbnail}" alt="${posts.title}">
                                    </div>
                                    <div class="col-xl-8 col-md-8 col-sm-8 col-12 post-content">
                                        <h3 class="title"> <a href="">${posts.title}</a></h3>
                                        <p class="author"><i class="fa-solid fa-tag"></i> <a href="">${posts.category}</a></p>
                                        <p>${posts.description}</p>
                                    </div>
                                </div>
                            <!-- post item end -->`
                // postdiv.innerHTML += post
                postdiv += post
            }
            console.log(postdiv)
        }
        $('#post-item').html(postdiv);

        // pagination
        let totalpage = Math.ceil(data.total/5)
        const paginationdiv = document.getElementById('pagination')
        let pagination_increment = 0;
        do {
            const onclickdata = `https://dummyjson.com/products?limit=${5}&skip=${pagination_increment*5}`
            
                const paginationelement = `<li id="paginationitem${pagination_increment+1}" class="page-item">
                        <button onclick="getDatas('${onclickdata}',${pagination_increment+1})" class="page-link">${pagination_increment+1}</button>
                        </li>`
                        paginationdiv.innerHTML += paginationelement
            
            pagination_increment++;
        }while (pagination_increment<totalpage);

        // make first pagination button active
        const paginationitem = document.getElementsByClassName('page-item')
        paginationitem[0].className += " active";

        
    });

    // All Post Here end   
  }





// post dynamic using pagination
function getDatas(value){
    // call pagination active status
    changeActive();

    fetch(value)
    .then((response) => {
         return response.json()})
    .then((data) => {

    

    // load pagination post set shimmer skeleton
    $('#post-item').html(template);      
    var displayProduct = 5;
    $('#results').html(createSkeleton(displayProduct));
    setTimeout(function(){
    // call function for post by paginator
    padinationLoadpost(data)
  }, 2000);
    //   end here post

  })
    .catch((error) => {
        console.error('Error:', error);
      });

}


// change paginationf active status
const changeActive =() =>{
    const paginationitem = document.getElementsByClassName('page-item')
    for (var i = 0; i < paginationitem.length; i++) {
        paginationitem[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
        });
      }
}



// get post from api by pagination
const padinationLoadpost = (data) =>{    

    const postdiv = document.getElementById('post-item')
    let postitem = ''
    for(let key in data.products){

        const apipost = data.products[key]



        let post = `<!-- post item start -->
            <div class="row post-item p-2">
                <div class="col-xl-4 col-md-4 col-sm-4 col-12 post-image">
                    <img class="w-100 h-100 rounded" src="${apipost.thumbnail}" alt="${apipost.title}">
                </div>
                <div class="col-xl-8 col-md-8 col-sm-8 col-12 post-content">
                    <h3 class="title"> <a href="">${apipost.title}</a></h3>
                    <p class="author"><i class="fa-solid fa-tag"></i> <a href="">${apipost.category}</a></p>
                    <p>${apipost.description}</p>
                </div>
            </div>
        <!-- post item end -->`
        postitem += post
    }
    // postdiv.innerHTML = postitem
    $('#post-item').html(postitem);
}