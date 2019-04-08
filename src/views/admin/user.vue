<template>
  <table-base :data="data" :table-columns="tableColumns" :table-name="tableName"></table-base>
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
      data: [{ id: 1, name: "name1" }, { id: 2, name: "name2" }],
      tableColumns: [
        { label: "id", prop: "id" },
        { label: "name", prop: "name" }
      ]
    };
  }
};
</script>
