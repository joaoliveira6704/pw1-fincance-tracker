<script>
import {
  ShoppingBag,
  Car,
  Zap,
  Coffee,
  Activity,
  Receipt,
  HelpCircle,
  GraduationCap,
  Scissors,
  Plane,
  Eye,
  Trash2,
  Edit,
  Pencil,
} from "lucide-vue-next";
import Button from "../Button.vue";

export default {
  name: "ExpenseCard",
  components: {
    ShoppingBag,
    Car,
    Zap,
    Coffee,
    Activity,
    Receipt,
    HelpCircle,
    GraduationCap,
    Scissors,
    Plane,
    Eye,
    Trash2,
    Edit,
    Button,
    Pencil,
  },
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
  emits: ["view", "edit", "delete"],
  computed: {
    formattedDate() {
      if (!this.expense.date) return "";
      return new Date(this.expense.date).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
    categoryIcon() {
      const map = {
        Alimentação: "ShoppingBag",
        Transporte: "Car",
        "Contas & Utilidades": "Zap",
        "Lazer & Entretenimento": "Coffee",
        Saúde: "Activity",
        Compras: "Receipt",
        Educação: "GraduationCap",
        "Cuidados Pessoais": "Scissors",
        Viagens: "Plane",
        Outros: "HelpCircle",
      };
      return map[this.expense.category] || "HelpCircle";
    },
    // CORREÇÃO AQUI: Lógica movida para computed
    shortDescription() {
      const desc = this.expense.description;
      if (!desc) return "Sem descrição.";

      // Se for maior que 20 caracteres, corta e adiciona "..."
      return desc.length > 20 ? desc.substring(0, 20) + "..." : desc;
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
  },
};
</script>

<template>
  <div
    class="group flex flex-col cursor-pointer p-5 rounded-2xl bg-secondary-bg border border-border hover:border-stackrgreen-500 transition-all duration-300 shadow-sm hover:shadow-md h-full relative"
    @click="$emit('view', expense)"
  >
    <div class="flex justify-between items-start mb-4">
      <div
        class="p-3 rounded-xl bg-main-bg text-stackrgreen-500 shadow-sm border border-border group-hover:bg-stackrgreen-500 group-hover:text-stackrblack transition-colors duration-300"
      >
        <component :is="categoryIcon" class="w-6 h-6" />
      </div>
      <div class="text-right">
        <span
          class="block font-ProximaNova font-bold text-xl text-primary-text"
        >
          {{ formatCurrency(expense.amount) }}
        </span>
        <span class="text-xs text-secondary-text font-Roboto font-medium">
          {{ formattedDate }}
        </span>
      </div>
    </div>

    <div class="mb-2">
      <h3
        class="font-ProximaNova font-bold text-lg text-primary-text truncate"
        :title="expense.name"
      >
        {{ expense.name }}
      </h3>
      <span
        class="text-xs font-bold text-stackrgreen-500 uppercase tracking-wide"
      >
        {{ expense.category || "Geral" }}
      </span>
    </div>

    <p
      class="text-secondary-text text-sm font-Roboto line-clamp-2 mb-6 flex-grow"
    >
      {{ shortDescription }}
    </p>

    <div class="mt-auto pt-4 border-t border-border grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        class="!px-0 !py-2 w-full flex items-center justify-center hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white"
        title="Ver Detalhes"
        @click.stop="$emit('edit', expense)"
      >
        <Pencil class="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        class="!px-0 !py-2 w-full flex items-center justify-center hover:!bg-red-500 hover:!border-red-500 hover:!text-white"
        title="Eliminar"
        @click.stop="$emit('delete', expense.id)"
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
button:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
