<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm v-on:submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  middleware: "auth-guard",
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch("posts/addPost", postData).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
