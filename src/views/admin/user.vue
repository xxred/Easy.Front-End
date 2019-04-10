<template>
  <table-base
    :data="data"
    :table-columns="tableColumns"
    :table-name="tableName"
  ></table-base>
</template>
<script>
import TableBase from "@/views/common/tableBase";
// import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
export default {
  name: "User",
  components: { TableBase },
  data() {
    return {
      tableName: "User",
      data: [{ id: 1, userName: "name1" }, { id: 2, userName: "name2" }],
      tableColumns: [
        { label: "id", prop: "id" },
        { label: "userName", prop: "userName" },
        { label: "normalizedUserName", prop: "normalizedUserName" }
      ]
    };
  }
};
</script>
