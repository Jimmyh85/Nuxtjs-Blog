<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" v-on:submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      .get(
        process.env.FIREBASE_BASE_URL +
          "/posts/" +
          context.params.postId +
          ".json"
      )
      .then(function(response) {
        // handle success
        return {
          loadedPost: { ...response.data, id: context.params.postId }
        };
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
