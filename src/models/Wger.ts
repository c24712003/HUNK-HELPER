export interface WgerScheduleDate{
    Date: string;
    isStart: boolean;
    isEnd: boolean;
    WorkoutId?: number;
}

export interface WgerSchedule {
    count: number;
    next: string;
    previous: string;
    results: WgerScheduleItem[];
}

export interface WgerScheduleItem {
    id: number;
    name: string;
    start_date: string;
    is_active: boolean;
    is_loop: boolean;
}

export interface WgerScheduleStep {
    count: number;
    next: string;
    previous: string;
    results: WgerScheduleStepItem[];
}

export interface WgerScheduleStepItem{
    id: number;
    schedule: number;
    workout: number;
    duration: number;
}

export interface WgerWorkoutAllData {
    obj: WgerWorkoutObj;
    day_list: WgerWorkoutDay[];
    muscles: Muscles;
}

export interface WgerWorkoutObj {
    id: number;
    creation_date: string;
    comment: string;
}

export interface WgerWorkoutDay {
    obj: DayObj;
    set_list: SetItem[];
    days_of_week: DaysOfWeek;
    muscles: Muscles;
}

export interface DayObj {
    id: number;
    training: number;
    description: string;
    day: number[];
}

export interface SetItem {
    obj: SetItemObj;
    exercise_list: SetItemExeItem[];
    has_settings: boolean;
    is_superset: boolean;
    muscles: Muscles;
}

export interface SetItemObj {
    id: number;
    exerciseday: number;
    exercises: number[];
    sets: number;
    order: number;
}

export interface SetItemExeItem {
    setting_obj_list: SettingObjItem[];
    setting_list: string[];
    reps_list: number[];
    has_weight: boolean;
    weight_list: number[];
    setting_text: string;
    repetition_units: Simple[];
    weight_units: Simple[];
    comment_list: string[];
    image_list: ImageSimple[];
    obj: SettingObjItemObj;

}

export interface SettingObjItem {
    id: number;
    set: number;
    exercise: number;
    repetition_unit: number;
    reps: number;
    weight: string;
    weight_unit: number;
    rir: number;
    order: number;
    comment: string;
}

export interface Simple {
    id: number;
    name: string;
}

export interface ImageSimple {
    image: string;
    is_main: boolean;
}

export interface SettingObjItemObj {
    id: number;
    category: number;
    description: string;
    name: string;
    name_original: string;
    muscles: number[];
    muscles_secondary: number[];
    equipment: number[];
    creation_date: string;
    language: number;
    uuid: string;
    variations: number;
}

export interface DaysOfWeek {
    text: string;
    day_list: DayOfWeek[];
}

export interface DayOfWeek {
    day_of_week: string;
}

export interface Muscles {
    front: Muscle_Default[];
    back: Muscle_Default[];
    frontsecondary: Muscle_Default[];
    backsecondary: Muscle_Default[];
}

export interface Muscle_Default {
    id: number;
    name: string;
    is_front: boolean;
    image_url_main: string;
    image_url_secondary: string;
}

export interface WgerTodayTrainingMenu {
    id: number;
    week: string;
    menuName?: string;
    workoutName: string;
    items: WorkoutItem[];
    date: string;
}

export interface WorkoutItem {
    id: number;
    set_id: number;
    exercise_ids: number[];
    item_setting_list: ItemSettingList[];
    is_super_set: boolean;
    done: boolean;
}

export interface ItemSettingList{
    set_name: string;
    setting_list: string[];
    setting_text: string;
}