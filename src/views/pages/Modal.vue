<template>
    <div>
        <div
            class="modal fade"
            id="productModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input
                            type="text"
                            v-model="ProductEditProps.imageUrl"
                            class="form-control"
                            id="image"
                            placeholder="請輸入圖片連結"
                        />
                        </div>
                        <div class="form-group">
                        <label for="customFile">
                            或 上傳圖片
                            <i class="fas fa-spinner fa-spin" v-if="status.uploadImg"></i>
                        </label>
                        <input
                            type="file"
                            id="customFile"
                            class="form-control"
                            ref="files"
                            @change="uploadFile"
                        />
                        </div>
                        <img
                        img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid"
                        :src="ProductEditProps.imageUrl"
                        />
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input
                            type="text"
                            v-model="ProductEditProps.title"
                            class="form-control"
                            id="title"
                            placeholder="請輸入標題"
                        />
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input
                            type="text"
                            v-model="ProductEditProps.category"
                            class="form-control"
                            id="category"
                            placeholder="請輸入分類"
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input
                            type="unit"
                            v-model="ProductEditProps.unit"
                            class="form-control"
                            id="unit"
                            placeholder="請輸入單位"
                            />
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                            <input
                            type="number"
                            v-model="ProductEditProps.origin_price"
                            class="form-control"
                            id="origin_price"
                            placeholder="請輸入原價"
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input
                            type="number"
                            v-model="ProductEditProps.price"
                            class="form-control"
                            id="price"
                            placeholder="請輸入售價"
                            />
                        </div>
                        </div>
                        <hr />

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea
                            type="text"
                            v-model="ProductEditProps.description"
                            class="form-control"
                            id="description"
                            placeholder="請輸入產品描述"
                        ></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea
                            type="text"
                            v-model="ProductEditProps.content"
                            class="form-control"
                            id="content"
                            placeholder="請輸入產品說明內容"
                        ></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input
                            class="form-check-input"
                            v-model="ProductEditProps.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            type="checkbox"
                            id="is_enabled"
                            />
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
import $ from 'jquery';


export default {
  name: "Modal",
  props: {
      ProductEditProps: {
          tpye: Object,
      },
      status: {
          tpye: Object,
      }
  },
  methods: {
        uploadFile() {
            const uploadFile = this.$refs.files.files[0];
            const formData = new FormData();
            formData.append('file-to-upload' , uploadFile);
            const url = `${process.env.VUE_APP_API}/api/erictest/admin/upload`;
            this.status.uploadImg = true;
            this.$http.post(url , formData , {
                headers:{
                    'Content-type' : 'mutipart/form-data'
                }
            }).then((response) => {
                // console.log(response.data);
                this.status.uploadImg = false;
                if(response.data.success) {
                    //寫不進set值內
                    // this.ProductEditProps.imageUrl = response.data.imageUrl;
                    //強制寫入
                    this.$set(this.ProductEditProps , 'imageUrl' , response.data.imageUrl);
                } else {
                    this.$bus.$emit('message:push' , response.data.message , 'danger')
                }
            })
        },
        updateProduct(){
            this.$emit('ProductEdit');
        }
  },
}
</script>