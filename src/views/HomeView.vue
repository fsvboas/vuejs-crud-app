<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import { LucidePlus } from 'lucide-vue-next'
import { NButton } from 'naive-ui'

// const { data } = useQuery({
//   queryKey: ['categories'],
//   queryFn: () => getCategories()
// })

// const categories = data.value || []
</script>

<template>
  <ContentContainer>
    <div>
      <div class="mb-6">
        <h3 class="text-xl leading-6 font-semibold mb-3 text-dark-blue">
          Organize seu catálogo com categorias e subcategorias
        </h3>
        <p class="leading-5 text-grayscale-pure-gray">
          Ao usar as categorias e subcategorias do catálogo, você ajuda seus clientes a encontrarem
          os produtos desejados.
        </p>
      </div>

      <RouterLink to="/my-categories" v-slot="{ navigate }">
        <n-button
          class="bg-brand-light-pink rounded-full text-brand-pure-pink !font-medium h-11 w-44"
          quaternary
          role="link"
          @click="navigate"
        >
          Criar categoria
          <LucidePlus class="w-4 h-4 ml-2" />
        </n-button>
      </RouterLink>
    </div>
  </ContentContainer>
</template>
