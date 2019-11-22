<template>
    <div>
        <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
        <div class="text-right">
            <button class="btn btn-primary mt-3" @click="openModal(true)" >建立新的產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="90">是否啟用</th>
                <th width="120">編輯</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in products" :key="key">
                    <td> {{item.category}} </td>
                    <td> {{item.title}} </td>
                    <td class="text-right"> {{item.origin_price | currency}} </td>
                    <td class="text-right"> {{item.price | currency}} </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
         <Pagination @changePage= "getProducts" :pagination="pagination"></Pagination>
        <!-- Modal -->
        <Modal :ProductEditProps="tempProduct" :status="status" @ProductEdit="updateProduct"></Modal>
        <DeleteModal></DeleteModal>
        <!-- End -->
    </div>
</template>

<script>
import $ from 'jquery';
import Modal from './Modal.vue';
import DeleteModal from './DeleteModal.vue';
import Pagination from './Pagination.vue'
export default {
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading : false,
            status: {
                uploadImg : false
            }
        }
    },
    components : {
        Modal,
        DeleteModal,
        Pagination
    },
    methods: {  
                //預設值設1,若有帶值則會用帶入的值
        getProducts(page = 1) {
            const api = `${process.env.VUE_APP_API}/api/erictest/admin/products?page=${page}`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                this.isLoading = false;
                this.products = response.data.products;
                this.pagination = response.data.pagination;
            })
        },
        openModal(isNew, item) {
            console.log(item);
            
            $('#productModal').modal('show');
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
            } else {
                this.tempProduct = Object.assign( {} ,item);
                this.isNew = false;
            }
        },
        openDeleteModal(item) {
            $("#delProductModal").modal("show");
            this.tempProduct = item ; //透過傳進item 刪除指定id
        },
        updateProduct() {
            let api = `${process.env.VUE_APP_API}/api/erictest/admin/product`;
            let httpMethod = 'post' ;
            if (!this.isNew) {
                api = `${process.env.VUE_APP_API}/api/erictest/admin/product/${this.tempProduct.id}`
                httpMethod = 'put'
            }            
            this.$http[httpMethod](api, {data: this.tempProduct}).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    $('#productModal').modal('hide');
                    this.getProducts(); 
                } else {
                    $('#productModal').modal('hide');
                    this.getProducts(); 
                    alert('新增失敗')
                }
                // this.products = response.data.products;
            })
        },
        
    },
    created() {
        this.getProducts();
        
    },
    // components: {
    //     Modal,
    // },
}
</script>