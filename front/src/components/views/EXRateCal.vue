<script setup>
    import { ref, reactive, computed } from "vue"

    const state = reactive({
        power: {
            main: [0, 0, 0],
            pioneer: [0, 0, 0]
        },
        time: 0,
        health: 0,
        times: 0,
        buki: [
            {
                name: "",
                damage: 0,
                hit: 0,
                accuracy_rate: 100.00,
                crit_rate: 0.00,
                crit_damage: 150.00
            }
        ],
        kill_rate: 0
    });

    //计算属性：分数
    const calc_score = computed(() => {
        var powers =
            state.power.main.reduce((prev, ship) => {
                return prev += ship;
            }, 0) +
            state.power.pioneer.reduce((prev, ship) => {
                return prev += ship;
            }, 0);
        return parseInt((5000 / Math.pow(state.time + 50, 0.36) - Math.pow(powers, 0.6)) * 10);
    });

    function addBuki() {
        state.buki.push({
            name: "",
            damage: 0,
            hit: 0,
            accuracy_rate: 100.00,
            crit_rate: 0.00,
            crit_damage: 150.00
        });
    }

    function deleteBuki(index) {
        state.buki.splice(index, 1);
    }

    function roll() {
        var kill = 0;

        for (let t = 0; t < state.times; t++) {
            var hp = 0;
            state.buki.forEach(buki => {
                for (let i = 0; i < buki.hit; i++) {
                    //命中
                    if (isRateEffect(buki.accuracy_rate) === false) continue;
                    //暴击
                    hp += buki.damage * (isRateEffect(buki.crit_rate) ? (buki.crit_damage / 100) : 1);
                }
            });
            if (hp >= state.health) {
                kill++;
            }
        }

        if (state.times > 0) {
            state.kill_rate = kill / state.times;
        }
        else {
            state.kill_rate = 0;
        }

        function isRateEffect(rate) {
            if (Math.random() * 100 < rate) return true;
            else return false;
        }
    }
</script>

<template>
    <el-row>
        <el-col :md="18" :sm="16" :xs="24">
            <el-row class="buki-btnbox">
                <el-form-item label="后排">
                    <el-row :gutter="16">
                        <el-col :span="6" v-for="(item, index) in state.power.main">
                            <el-input-number
                                class="input-number"
                                v-model="state.power.main[index]"
                                :controls="false"
                                :min="0"
                                :precision="0"
                            />
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="前排">
                    <el-row :gutter="16">
                        <el-col :span="6" v-for="(item, index) in state.power.pioneer">
                            <el-input-number
                                class="input-number"
                                v-model="state.power.pioneer[index]"
                                :controls="false"
                                :min="0"
                                :precision="0"
                            />
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-row>
            <el-row class="buki-btnbox">
                <el-form-item>
                    <el-button type="primary" @click="addBuki">添加武器</el-button>
                </el-form-item>
            </el-row>
        </el-col>
        <el-col :md="6" :sm="8" :xs="24">
            <el-form>
                <el-form-item label="血量">
                    <el-input-number
                        class="input-number"
                        v-model="state.health"
                        :controls="false"
                        :min="0"
                        :precision="0"
                    />
                </el-form-item>
                <el-form-item label="次数">
                    <el-input-number
                        class="input-number"
                        v-model="state.times"
                        :controls="false"
                        :min="0"
                        :precision="0"
                    />
                </el-form-item>
                
                <el-form-item>
                <el-button
                    type="primary"
                    @click="roll"
                    style="flex: 1;"
                    >Roll</el-button
                >
                </el-form-item>
                <el-form-item label="斩杀率">
                    <el-input
                        v-model="state.kill_rate"
                        :readonly="true"
                    ></el-input>
                </el-form-item>

                <el-divider />

                <el-form-item label="时间">
                    <el-input-number
                        class="input-number"
                        v-model="state.time"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="分数">
                    <el-input
                        v-model="calc_score"
                        :readonly="true"
                    ></el-input>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

    <el-row>
        <el-table
            class="buki-table"
            :data="state.buki"
            :border="true"
            ><el-table-column label="武器名称">
                <template #default="scope">
                    <el-input
                        class="input-number"
                        v-model="scope.row.name"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="伤害">
                <template #default="scope">
                    <el-input-number
                        class="input-number"
                        v-model="scope.row.damage"
                        :controls="false"
                        :min="0"
                        :precision="0"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="Hit">
                <template #default="scope">
                    <el-input-number
                        class="input-number"
                        v-model="scope.row.hit"
                        :controls="false"
                        :min="0"
                        :precision="0"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="命中率">
                <template #default="scope">
                    <el-input-number
                        class="input-number"
                        v-model="scope.row.accuracy_rate"
                        :controls="false"
                        :min="0"
                        :precision="2"
                        ><template #append>%</template>
                    </el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="暴击率">
                <template #default="scope">
                    <el-input-number
                        class="input-number"
                        v-model="scope.row.crit_rate"
                        :controls="false"
                        :min="0"
                        :precision="2"
                        ><template #append>%</template>
                    </el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="暴击伤害">
                <template #default="scope">
                    <el-input-number
                        class="input-number"
                        v-model="scope.row.crit_damage"
                        :controls="false"
                        :min="0"
                        :precision="2"
                        ><template #append>%</template>
                    </el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="其他" width="85">
                <template #default="scope">
                    <el-button type="danger" @click="deleteBuki(scope.$index)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<style scoped>
    .buki-btnbox {
        margin: auto 0 0 0;
    }
    .buki-table {
        margin: 0 0 16px;
    }
    .input-number {
        width: 100%;
    }

    .el-input-number .el-input__inner {
        text-align: left !important;
    }
</style>