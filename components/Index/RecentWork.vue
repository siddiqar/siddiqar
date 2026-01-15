<script lang="ts" setup>
const { data: repos } = await useFetch('/api/repos')

const recentRepos = computed(() => {
    return repos.value?.slice(0, 5) || []
})
</script>

<template>
    <UContainer :ui="{ base: 'py-24 space-y-4', constrained: 'max-w-full' }">
        <h4 class="uppercase text-xs font-semibold text-gray-400 mb-4 text-center">Recent repositories</h4>
        <h1 class="text-3xl sm:text-5xl lg:text-4xl max-w-screen-lg text-center mx-auto font-light">Building and <span class="text-primary">Learning</span> in Public</h1>
        <br />
        <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <UCard v-for="repo in recentRepos" :key="repo.id" :ui="{ base: 'h-full', shadow: 'shadow-none transition-shadow dark:shadow-2xl dark:hover:shadow-primary-800/25', body: { base: 'h-full space-y-4' } }">
                <div class="flex items-center justify-between">
                    <UBadge size="sm" :label="repo.language || 'Code'" class="uppercase" color="gray" v-if="repo.language" />
                    <div class="flex items-center gap-1 text-xs text-gray-500" v-if="repo.stars > 0">
                        <UIcon name="i-heroicons-star" class="size-3" />
                        <span>{{ repo.stars }}</span>
                    </div>
                </div>
                <h4 class="line-clamp-2">{{ repo.title }}</h4>
                <p class="text-gray-400 dark:text-gray-500 text-sm line-clamp-3">{{ repo.description }}</p>
                <ClientOnly>
                    <UButton trailing-icon="i-heroicons-arrow-up-right" @click.prevent="navigateTo(repo.url, { open: { target: '_blank' } })" size="xs" color="gray" variant="link" label="View on GitHub" :ui="{ rounded: 'rounded-full', padding: { xs: 'px-0' } }" />
                </ClientOnly>
            </UCard>
        </div>
        <div class="text-center">
            <UButton size="xl" color="gray" class="text-sm" variant="ghost" trailing-icon="i-heroicons-arrow-right" label="More repositories" to="/works" :ui="{ padding: { xl: 'px-6' }, rounded: 'rounded-full' }" />
        </div>
    </UContainer>
</template>
