<template>
  <div id="QuestionView">
    <a-form :model="searchParams" layout="inline" style="min-width: 280px">
      <a-form-item field="title" label="名称">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 280px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <!--    表格-->
    <a-divider :size="size" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题
          </a-button>
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${record.submitNum ? record.acceptedNum / record.submitNum : "0"}%(${
            record.acceptedNum
          }/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const size = 0;
const router = useRouter();
const show = ref(true);
const total = ref(0);
const dataList = ref([]);
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = Number(res.data.total);
  } else {
    message.error("加载失败," + res.message);
  }
};

onMounted(() => {
  loadData();
});
/**
 * 监听数据，当发生改变重新加载
 */
watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
//跳转题目做题页面
const toQuestionPage = async (question: Question) => {
  await router.push({
    path: `/write/question/${question.id}`,
  });
};
//翻页
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
//搜索
const doSubmit = () => {
  //重置页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#QuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
