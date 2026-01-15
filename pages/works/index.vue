<script lang="ts" setup>
const { data: repos } = await useFetch('/api/repos')
</script>

<template>
    <UContainer :ui="{ base: 'py-6 lg:py-12 space-y-12' }">
        <AppTitle title="Repositories" description="Here are my public GitHub repositories showcasing various projects and experiments." />
        <ul class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <li v-for="repo in repos" :key="repo.id">
                <UCard :ui="{ base: 'h-full', shadow: 'shadow-none transition-shadow dark:shadow-2xl dark:hover:shadow-primary-800/25', body: { base: 'space-y-4' } }">
                    <div class="flex items-center justify-between">
                        <UBadge size="sm" :label="repo.language || 'Code'" class="uppercase" color="gray" v-if="repo.language" />
                        <div class="flex items-center gap-2 text-xs text-gray-500">
                            <div class="flex items-center gap-1" v-if="repo.stars > 0">
                                <UIcon name="i-heroicons-star" class="size-4" />
                                <span>{{ repo.stars }}</span>
                            </div>
                            <div class="flex items-center gap-1" v-if="repo.forks > 0">
                                <UIcon name="i-heroicons-code-bracket" class="size-4" />
                                <span>{{ repo.forks }}</span>
                            </div>
                        </div>
                    </div>
                    <h4 class="line-clamp-2 font-semibold">{{ repo.title || repo.name }}</h4>
                    <p class="text-gray-400 dark:text-gray-500 text-sm line-clamp-3">{{ repo.description }}</p>
                    <div class="flex gap-2">
                        <ClientOnly>
                            <UButton trailing-icon="i-heroicons-arrow-up-right" @click.prevent="navigateTo(repo.url, { open: { target: '_blank' } })" size="xs" color="gray" variant="link" label="View on GitHub" :ui="{ rounded: 'rounded-full', padding: { xs: 'px-0' } }" />
                        </ClientOnly>
                        <ClientOnly v-if="repo.homepage">
                            <UButton trailing-icon="i-heroicons-arrow-up-right" @click.prevent="navigateTo(repo.homepage, { open: { target: '_blank' } })" size="xs" color="primary" variant="link" label="Live Demo" :ui="{ rounded: 'rounded-full', padding: { xs: 'px-0' } }" />
                        </ClientOnly>
                    </div>
                </UCard>
            </li>
        </ul>
        <p class="text-sm text-gray-400 dark:text-gray-500 text-center" v-if="!repos || repos.length === 0">Loading repositories...</p>
        <p class="text-sm text-gray-400 dark:text-gray-500 text-center" v-else>End of repositories</p>
    </UContainer>
</template>
