<template>
    <div>
        <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
        </div>
        <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark"> {{item.title}} </a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price"> 原價 {{item.origin_price}} </div>
                        <del class="h6" v-if="item.price"> 原價 {{item.origin_price}} </del>
                        <div class="h5" v-if="item.price"> 特價 {{item.price}} </div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                        查看更多 
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)"> 
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pull-right">
        <button class="btn btn-primary btn-sm cartBtn" @click="cartModal">
            <i class="fas fa-cart-plus"></i> <br> 購<br>物<br>車</button>
        </div>
        <!-- modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                    <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                    <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                    小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button type="button" class="btn btn-primary"
                    @click="addtoCart(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                    加到購物車
                    </button>
                </div>
            </div>
            </div>
        </div>
        <!-- end -->
        <!-- Cart -->
        <div class="modal" id="cartModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">購物車</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-8 mx-auto">
                        <table class="table mt-4 test">
                            <thead>       
                                <th width="40"></th>        
                                <th width="150">品名</th>
                                <th width="90">數量</th>
                                <th width="90">單價</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item, key) in cart.carts" :key="key">
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    <td class="align-middle"> {{item.product.title}} 
                                        <div class="text-success" v-if="item.coupon">
                                            已套用優惠券
                                        </div>
                                    </td>
                                    <td>
                                        {{item.qty}} / {{item.product.unit}}                     
                                    </td>
                                    <td class="text-right">
                                        {{item.final_total | currency}}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="text-right">總計</td>
                                    <td class="text-right">{{ cart.total }}</td>
                                </tr>
                                <tr v-if="cart.final_total !== cart.total">
                                    <td colspan="3" class="text-right text-success">折扣價</td>
                                    <td class="text-right text-success">{{ cart.final_total }}</td>
                                </tr>
                            </tfoot>
                        </table>
                            <div class="input-group mb-3 primary">
                                <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="codes">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="setCoupon">套用優惠</button>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="my-5 row justify-content-center">
                    <form class="col-md-6" @submit.prevent="createOrder">
                        <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" v-validate="'required|email'" class="form-control" name="email" id="useremail"
                            v-model="form.user.email" placeholder="請輸入 Email" required>
                        <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}} </span>
                        </div>
                    
                        <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" v-validate="'required'" class="form-control" name="name" id="username"
                            v-model="form.user.name" placeholder="輸入姓名" :class="{'is-invalid' : errors.has('name')}">
                        <span class="text-danger" v-if="errors.has('name')"> 請輸入姓名 </span>
                        </div>
                    
                        <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" v-validate="'required'" class="form-control" name="phone" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                        <span class="text-danger" v-if="errors.has('phone')"> 請輸入電話號碼 </span>
                        </div>
                    
                        <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" v-validate="'required'" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                            placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')"> 請輸入地址 </span>
                        </div>
                    
                        <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                        </div>
                        <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        <!-- end -->
    </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return{
      products: [],
      product: {},
      status: {
          loadingItem: '',
      },
      isLoading: false,
      cart:{
          carts: {},
      },
      form:{
          user:{
              name:'',
              email:'',
              tel:'',
              address:'',
          }
      },
      codes:'',
    }
  },
  methods: {
    getProducts(page = 1) {
        const api = `${process.env.VUE_APP_API}/api/erictest/products?page${page}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
            // console.log(response.data);
            this.isLoading = false;
            this.products = response.data.products;
            this.pagination = response.data.pagination;
        })
    },
    getProduct(id) {
        const api = `${process.env.VUE_APP_API}/api/erictest/product/${id}`;
        this.status.loadingItem = id;
        this.$http.get(api).then((response) => {
            console.log(response.data);
            this.product = response.data.product;
            this.status.loadingItem = '';
            $('#productModal').modal('show');                     
        })
    },
    addtoCart(id , qty = 1) {
        const api = `${process.env.VUE_APP_API}/api/erictest/cart`;
        this.status.loadingItem = id;
        const cart = {
            product_id : id ,
            qty
        }
        this.$http.post(api, { data: cart }).then((response) => {
            console.log(response.data);
            console.log(cart);
            
            this.status.loadingItem = '';  
            this.getCart();
            $('#productModal').modal('hide');
        })
    },
    getCart(){
        const api = `${process.env.VUE_APP_API}/api/erictest/cart`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
            
            // console.log(response.data);
            this.cart = response.data.data;
            this.isLoading = false;
            // console.log(this.cart);
            
        })
    },
    removeCart(id){
        const api = `${process.env.VUE_APP_API}/api/erictest/cart/${id}`;
        this.isLoading = true;
        this.$http.delete(api).then((response) => {
            this.getCart();
            this.isLoading = false;
        })
    },
    cartModal(){
        $('#cartModal').modal('show');
    },
    setCoupon(code){
        const api = `${process.env.VUE_APP_API}/api/erictest/coupon`
        this.isLoading = true ;
        const codes = {
            code: this.codes
        };    
        this.$http.post(api, {data:codes} ).then((response) => {
            console.log(response.data);
            console.log(codes);
            this.getCart();
        })
    },
    createOrder(){
        const api = `${process.env.VUE_APP_API}/api/erictest/order`;
        const order = this.form;
        this.isLoading = true;
        this.$http.post(api , {data:order}).then((response) => {
            console.log('訂單已建立' ,response);
            this.isLoading = false;
        })
    }
  },
  
  created() {
      this.getProducts();
      this.getCart()
  },
}
</script>

<style scoped>
.cartBtn{
    position: fixed;
    bottom: 250px;
    right: 0px;
}
</style>