<template>
    <div>
        <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
        <div class="text-right">
            <button class="btn btn-primary mt-4" @click="openModal(true)" >建立新的產品 test</button>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="80">編輯</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in products" :key="key">
                    <td> {{item.category}} </td>
                    <td> {{item.title}} </td>
                    <td class="text-right"> {{item.origin_price}} </td>
                    <td class="text-right"> {{item.price}} </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
                    :class="{'active': pagination.current_page == page}">
                    <a class="page-link" href="#"> {{page}} </a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next }">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
        <!-- Modal -->
        <Modal></Modal>
        <!-- End -->
    </div>
</template>

<script>
import $ from 'jquery';
import Modal from './Modal.vue';
export default {
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading : false,
            status: {
                fileUploading : false 
            }
        }
    },
    components : {
        Modal
    },
    methods: {
        getProducts() {
            const api = `${process.env.VUE_APP_API}/api/erictest/admin/products?page=:page`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                this.isLoading = false;
                this.products = response.data.products;
                this.pagination = response.data.pagination;
            })
        },
        openModal(isNew, item) {
            $('#productModal').modal('show');
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
            } else {
                this.tempProduct = Object.assign( {} ,item);
                this.isNew = false;
            }
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