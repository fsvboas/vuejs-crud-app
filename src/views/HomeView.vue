<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import GenericButton from '@/components/core/GenericButton.vue'
import { LucidePlus } from 'lucide-vue-next'
import { NIcon } from 'naive-ui'

// const { data } = useQuery({
//   queryKey: ['categories'],
//   queryFn: () => getCategories()
// })

// const categories = data.value || []
</script>

<template>
  <ContentContainer>
    <div class="mb-6">
      <h3 class="text-xl leading-6 font-semibold mb-3 text-dark-blue">
        Organize seu catálogo com categorias e subcategorias
      </h3>
      <p class="leading-5 text-greyscale-pure-grey">
        Ao usar as categorias e subcategorias do catálogo, você ajuda seus clientes a encontrarem os
        produtos desejados.
      </p>
    </div>

    <RouterLink to="/my-categories" v-slot="{ navigate }" class="w-fit">
      <GenericButton
        round
        color="#FFE2EB"
        text-color="#DA3468"
        role="link"
        @click="navigate"
        class="h-11 w-44"
      >
        <span class="mr-2 text-base">Criar categoria</span>
        <n-icon size="16">
          <LucidePlus />
        </n-icon>
      </GenericButton>
    </RouterLink>
  </ContentContainer>
</template>
