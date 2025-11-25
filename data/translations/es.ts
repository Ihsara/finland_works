
import { TranslationResource } from "./types";

export const es: TranslationResource = {
  ui: {
    landing_welcome: "¡Bienvenido!", landing_subtitle: "Encuentra tu camino laboral en Finlandia", landing_btn_quiz: "Cuéntame sobre ti", landing_btn_continue: "Mi Guía", landing_btn_ask: "Iniciar chat", landing_btn_browse: "Explorar guía", landing_load_sample: "Cargar ejemplo", landing_erase: "Borrar datos", landing_add_key: "Añadir API", landing_choose_lang: "Idioma",
    dash_greeting: "¡Hola, {name}!", dash_greeting_guest: "¡Hola!", dash_subtitle: "Bienvenido de nuevo a tu guía personal.", dash_subtitle_guest: "Vamos a crear tu perfil.", dash_btn_guide: "Abrir Guía", dash_btn_browse: "Explorar", dash_btn_ask: "Preguntar a IA", dash_btn_history: "Historial", dash_btn_cv: "Importar CV", dash_switch_profile: "Cambiar", dash_new_profile: "Nuevo", dash_edit_profile: "Editar", dash_profile_overview: "Perfil",
    dash_education: "Educación", dash_profession: "Profesión", dash_languages: "Idiomas", dash_narrative_aspirations: "Aspiraciones", dash_narrative_challenges: "Desafíos",
    chat_placeholder: "Pregunta algo...", chat_end_session: "Terminar", chat_header_assistant: "Asistente", chat_prompt_context_inquiry: "Dime más sobre \"{sentence}\"", chat_ask_length: "¿Respuesta corta o larga?",
    btn_back_dashboard: "Volver", btn_save: "Guardar",
    profile_btn_guide: "Mi Guía", profile_btn_guide_desc: "Artículos recomendados", profile_btn_plan: "Mi Plan", profile_btn_plan_desc: "Pronto", profile_sect_languages: "Idiomas", profile_sect_skills: "Habilidades", profile_sect_narrative: "Historia", profile_label_aspirations: "Metas", profile_label_challenges: "Miedos", profile_label_education: "Educación", profile_label_profession: "Profesión", profile_completeness: "{percentage}% completo", profile_completeness_hint: "Responde algunas preguntas más", profile_btn_update: "Actualizar", profile_btn_continue: "Continuar",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Para {name}", wiki_explore_cats: "Categorías", wiki_explore_subtitle: "Elige un tema.", wiki_full_index: "Índice", wiki_full_index_subtitle: "Todo.", wiki_nav_list: "Lista", wiki_nav_icons: "Iconos", wiki_section_chapters: "Capítulos", wiki_btn_mark_done: "Hecho", wiki_btn_later: "Más tarde", wiki_btn_saved: "Guardado", wiki_btn_completed: "Completado", wiki_ctx_ask: "Preguntar sobre esto", wiki_topic_label: "Tema: {tag}", wiki_topic_desc: "Resumen y Artículos", wiki_guide_prefix: "GUÍA", wiki_stat_articles: "artículos", wiki_stat_complete: "listo", wiki_section_prefix: "Sección",
    wizard_header_quiz: "Cuestionario", wizard_greeting_short: "¡Hola, {name}!", wizard_title_init: "Crear Perfil", wizard_title_custom: "Creando a {name}", wizard_phase_identity: "FASE 1: IDENTIDAD", wizard_phase_demo: "FASE 2: FONDO", wizard_phase_status: "FASE 3: ESTADO", wizard_phase_skills: "FASE 4: HABILIDADES", wizard_phase_mindset: "FASE 5: MENTALIDAD", wizard_phase_vision: "FASE 6: VISIÓN", wizard_nickname_hint: "* Puedes usar un apodo.", wizard_btn_ask: "Preguntar", wizard_btn_next: "Siguiente", wizard_btn_prev: "Anterior", wizard_btn_submit: "Enviar", wizard_btn_finish_early: "Guardar", wizard_btn_generate_name: "Generar nombre", wizard_ribbon_greeting: "¡Encantado, {name}!", wizard_title_name: "¿Cómo te llamas?", wizard_desc_name: "Introduce tu nombre", wizard_placeholder_name: "Tu nombre",
    wizard_step2_title: "¿Cuántos años tienes?", wizard_step2_desc: "Grupo de edad", wizard_step2_placeholder: "Edad",
    wizard_step3_title: "¿Estado civil?",
    wizard_marital_solo_title: "Solo", wizard_marital_solo_desc: "Sin pareja ni hijos", wizard_marital_pair_title: "Con familia", wizard_marital_pair_desc: "Pareja o hijos", wizard_marital_secret_title: "Secreto", wizard_marital_secret_desc: "No lo digo",
    wizard_children_title: "¿Tienes hijos?", wizard_children_desc: "Para consejos sobre escuelas.", wizard_children_yes: "Sí", wizard_children_no: "No", wizard_family_details_title: "Detalles Familiares", wizard_family_count_label: "¿Cuántos?", wizard_family_ages_label: "¿Edades?", wizard_family_ages_hint: "Selecciona todos.", wizard_age_group_0_6: "Guardería (0-6)", wizard_age_group_7_12: "Escuela (7-12)", wizard_age_group_13_17: "Adolescentes (13-17)", wizard_age_group_18: "Adultos (18+)",
    wizard_step4_title: "¿De dónde eres?", wizard_step4_desc: "País de origen", wizard_step4_placeholder: "Nombre del país...", wizard_step4_no_match: "No encontrado", wizard_btn_search_country: "Buscar", wizard_btn_select_region: "Región", wizard_region_europe: "Europa", wizard_region_americas: "América", wizard_region_asia: "Asia", wizard_region_africa: "África", wizard_region_oceania: "Oceanía", wizard_region_middle_east: "Oriente Medio", wizard_eu_question: "¿Ciudadano UE?", wizard_eu_yes: "Sí", wizard_eu_no: "No",
    wizard_step5_title: "Derecho a trabajar", wizard_permit_full_title: "Ilimitado", wizard_permit_full_desc: "Permanente, Familia, UE", wizard_permit_restricted_title: "Restringido", wizard_permit_restricted_desc: "Ligado al empleador", wizard_permit_student_title: "Estudiante", wizard_permit_student_desc: "Horas limitadas",
    wizard_step6_title: "Educación", wizard_step6_desc: "¿Tu nivel?", wizard_step6_field_label: "Campo (Opcional)", wizard_step6_field_placeholder: "ej. Ingeniería", wizard_edu_general_title: "General", wizard_edu_general_desc: "Secundaria.", wizard_edu_applied_title: "Profesional", wizard_edu_applied_desc: "FP.", wizard_edu_uni_title: "Universidad", wizard_edu_uni_desc: "Grado académico.",
    wizard_step7_title: "¿Tu profesión?", wizard_step7_desc: "¿O qué buscas?", wizard_step7_placeholder: "ej. Enfermero",
    wizard_step8_title: "Finés", wizard_lbl_finnish_level: "Nivel", wizard_lbl_finnish_motivation: "Motivación", wizard_opt_lang_none: "Nada", wizard_opt_lang_basics: "Básico (A1)", wizard_opt_lang_inter: "Intermedio (A2-B1)", wizard_opt_lang_fluent: "Fluido (B2+)", wizard_scale_1_motivation: "Curioso", wizard_scale_5_motivation: "Imparable",
    wizard_step9_title: "Inglés", wizard_opt_lang_en_none: "No", wizard_opt_lang_en_basic: "Básico", wizard_opt_lang_en_working: "Laboral", wizard_opt_lang_en_fluent: "Fluido",
    wizard_step10_title: "Visión", wizard_step10_aspirations_label: "Metas", wizard_step10_aspirations_placeholder: "¿Qué esperas lograr?", wizard_step10_challenges_label: "Desafíos", wizard_step10_challenges_placeholder: "¿Qué te preocupa?",
    wizard_step12_title: "¿Cultura?", wizard_opt_cult_low: "Misterio", wizard_opt_cult_med: "Observando", wizard_opt_cult_high: "Inmerso",
    wizard_step13_title: "¿Ritmo de vida?", wizard_scale_1_life: "Extraño", wizard_scale_5_life: "Hogar",
    wizard_step14_title: "¿Confianza laboral?", wizard_scale_1_career: "Necesito guía", wizard_scale_5_career: "Tengo plan",
    wizard_step15_title: "¿Claridad?", wizard_opt_info_none: "Confuso", wizard_opt_info_some: "Aclarándose", wizard_opt_info_high: "Cristalino",
    wizard_step16_title: "¿Qué te alegra?", wizard_opt_excite_career: "Carrera", wizard_opt_excite_life: "Seguridad", wizard_opt_excite_nature: "Naturaleza", wizard_opt_excite_adventure: "Aventura",
    wizard_rating_winter: "Invierno", wizard_rating_thaw: "Deshielo", wizard_rating_growth: "Crecimiento", wizard_rating_bloom: "Floración", wizard_rating_summer: "Verano",
    history_title: "Historial", history_empty: "Vacío.", history_tab_summary: "Resumen", history_tab_transcript: "Chat", history_no_summary: "Sin resumen.", history_generating: "Escribiendo...", history_generating_desc: "En segundo plano.",
    cv_title: "Analizar CV", cv_subtitle: "Pega tu CV.", cv_placeholder: "Texto...", cv_btn_analyze: "Analizar", cv_btn_processing: "Procesando...", cv_warning_key: "Requiere API Key.", cv_key_update: "Actualizar", cv_key_required: "Clave requerida", cv_key_desc: "Por seguridad.", cv_key_placeholder: "Clave...", cv_key_save: "Guardar", cv_alert_success: "Guardado.", cv_alert_error: "Error.", cv_btn_manage_key: "API Key",
    settings_title: "Ajustes", settings_sect_general: "General", settings_sect_appearance: "Apariencia", settings_sect_data: "Datos", settings_length_label: "Longitud", settings_theme_label: "Tema", settings_theme_system: "Sistema", settings_theme_light: "Claro", settings_theme_dark: "Oscuro", settings_opt_ask: "Preguntar", settings_opt_short: "Corto", settings_opt_long: "Largo", settings_clear_data: "Borrar datos", settings_clear_data_desc: "Borra todo.", settings_btn_clear: "Borrar todo"
  },
  wiki: {
    titles: {
      foundation: 'Lo esencial', job_strategy: 'Estrategia', workplace: 'Cultura laboral', industries: 'Industrias', life: 'Vida',
      identity: 'Identidad', security: 'Seguridad Social', market: 'Mercado', tools: 'Herramientas', rights: 'Derechos',
      social: 'Social', norms: 'Normas', specialist: 'Especialista', hands_on: 'Manual', housing: 'Vivienda',
      family: 'Familia', language: 'Idioma',
      social_unemployment: 'Desempleo', social_housing: 'Ayuda Vivienda', social_pension: 'Pensión',
      bureaucracy_dvv: 'DVV e Identificación', bureaucracy_migri: 'Migración', bureaucracy_tax: 'Tarjeta de Impuestos',
      job_te_office: 'Oficina TE', job_portals: 'Portales', job_entrepreneurship: 'Emprendimiento',
      job_cover_letter: 'Carta de presentación', job_interview: 'Entrevista', job_linkedin: 'LinkedIn', job_recognition: 'Reconocimiento',
      work_contract: 'Contrato', work_hours: 'Horas', work_holidays: 'Vacaciones',
      culture_meetings: 'Reuniones', culture_feedback: 'Feedback', culture_names: 'Nombres',
      prof_engineering: 'Ingeniería', prof_business: 'Negocios',
      housing_contracts: 'Alquiler', family_school: 'Escuela'
    },
    articles: {
      'guide_start': { title: '¡Bienvenido a Finlandia! 🇫🇮', content: `# Guía de Supervivencia\n\n**Filosofía:**\nFinlandia funciona con confianza, silencio y café.\n\n### Uso\n1. **Leer:** Guías.\n2. **Chat:** Pregunta a IA.\n3. **Perfil:** Actualízalo.` },
      'bureaucracy_dvv': { title: 'DVV e ID', content: `# DVV 🆔\n\n**Prioridad: INMEDIATA**\n\n### Misión\nExistir legalmente. Obtén tu **ID Personal**.\n\n### ¿Por qué?\nBanco, teléfono, impuestos.` },
      'bureaucracy_migri': { title: 'Migri', content: `# Migri 🛂\n\n### Misión\nPermiso de Residencia.\n\n### Consejos\n* **Reserva pronto:** Colas largas.\n* **Vía rápida:** Para especialistas.` },
      'bureaucracy_tax': { title: 'Tarjeta de Impuestos', content: `# Verokortti 💳\n\n**Regla:** Sin tarjeta = 60% impuestos.\n\n### Proceso\n1. Entra en **OmaVero**.\n2. Estima ingresos.\n3. Baja PDF.\n4. Envía al jefe.` },
      'social_unemployment': { title: 'Desempleo', content: `# ¿Sin trabajo? 📉\n\n### 1. Regístrate\nEn la **Oficina TE** el primer día.\n\n### 2. Pagadores\n* **Kela:** Básico.\n* **Fondo:** Según ingresos (si eres miembro).` },
      'job_market_overview': { title: 'Mercado Laboral', content: `# Mercado Oculto 📉\n\n**70-80% trabajos no se publican.**\n\n### Estrategias\n* **Red:** Amigos.\n* **Directo:** Escribe a empresas.` },
      'culture_meetings': { title: 'Reuniones', content: `# Reuniones 📅\n\n**Eficaces y puntuales.**\n\n* **Inicio:** A tiempo.\n* **Agenda:** Síguela.\n* **Sin relleno.**` },
      'culture_essentials': { title: 'Valores', content: `# Confianza y Silencio 🤫\n\n1. **Confianza:** Cumple lo que dices.\n2. **Silencio:** No temas al silencio.` }
    }
  }
};
