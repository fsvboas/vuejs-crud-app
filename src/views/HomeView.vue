<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import { NButton } from 'naive-ui'
import { RouterLink } from 'vue-router'

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
      <n-button
        class="rounded-full !bg-brand-light-pink gap-2 py-[10px] px-4 text-base !text-brand-pure-pink"
        quaternary
      >
        <RouterLink to="/my-categories">
          Criar categorias
          <UIcon name="i-lucide:plus" class="w-4 h-4 text-brand-pure-pink" />
        </RouterLink>
      </n-button>
    </div>
  </ContentContainer>
</template>
