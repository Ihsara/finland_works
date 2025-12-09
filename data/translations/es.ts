
import { TranslationResource } from "./types";

export const es: TranslationResource = {
  ui: {
    landing_welcome: "¡Bienvenido!", landing_subtitle: "Encuentra tu camino laboral en Finlandia", landing_btn_quiz: "Cuéntame sobre ti", landing_btn_continue: "Mi Guía", landing_btn_ask: "Iniciar chat", landing_btn_browse: "Explorar guía", landing_load_sample: "Cargar ejemplo", landing_erase: "Borrar datos", landing_add_key: "Añadir API", landing_choose_lang: "Idioma",
    dash_greeting: "¡Hola, {name}!", dash_greeting_guest: "¡Hola!", dash_subtitle: "Bienvenido de nuevo a tu guía personal.", dash_subtitle_guest: "Vamos a crear tu perfil.", dash_btn_guide: "Abrir Guía", dash_btn_browse: "Explorar", dash_btn_ask: "Preguntar a IA", dash_btn_history: "Historial", dash_btn_cv: "Importar CV", dash_switch_profile: "Cambiar", dash_new_profile: "Nuevo", dash_edit_profile: "Editar", dash_profile_overview: "Perfil",
    dash_education: "Educación", dash_profession: "Profesión", dash_languages: "Idiomas", dash_narrative_aspirations: "Aspiraciones", dash_narrative_challenges: "Desafíos",
    chat_placeholder: "Pregunta algo...", chat_end_session: "Terminar", chat_header_assistant: "Asistente", chat_prompt_context_inquiry: "Dime más sobre \"{sentence}\"", chat_ask_length: "¿Respuesta corta o larga?",
    btn_back_dashboard: "Volver", btn_save: "Guardar",
    profile_btn_guide: "Mi Guía", profile_btn_guide_desc: "Artículos recomendados", profile_btn_plan: "Mi Plan", profile_btn_plan_desc: "Pronto", profile_sect_languages: "Idiomas", profile_sect_skills: "Habilidades", profile_sect_narrative: "Historia", profile_label_aspirations: "Metas", profile_label_challenges: "Miedos", profile_label_education: "Educación", profile_label_profession: "Profesión", profile_completeness: "{percentage}% completo", profile_completeness_hint: "Responda algunas preguntas más", profile_btn_update: "Actualizar", profile_btn_continue: "Continuar",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "Para {name}", wiki_explore_cats: "Categorías", wiki_explore_subtitle: "Elige un tema.", wiki_full_index: "Índice", wiki_full_index_subtitle: "Todo.", wiki_nav_list: "Lista", wiki_nav_icons: "Iconos", wiki_section_chapters: "Capítulos", wiki_btn_mark_done: "Hecho", wiki_btn_later: "Más tarde", wiki_btn_saved: "Guardado", wiki_btn_completed: "Completado", wiki_ctx_ask: "Preguntar sobre esto", wiki_topic_label: "Tema: {tag}", wiki_topic_desc: "Resumen y Artículos", wiki_guide_prefix: "GUÍA", wiki_stat_articles: "artículos", wiki_stat_complete: "listo", wiki_section_prefix: "Sección",
    wizard_header_quiz: "Cuestionario", wizard_greeting_short: "¡Hola, {name}!", wizard_title_init: "Crear Perfil", wizard_title_custom: "Creando a {name}", wizard_phase_identity: "FASE 1: IDENTIDAD", wizard_phase_demo: "FASE 2: FONDO", wizard_phase_status: "FASE 3: ESTADO", wizard_phase_skills: "FASE 4: HABILIDADES", wizard_phase_mindset: "FASE 5: MENTALIDAD", wizard_phase_vision: "FASE 6: VISIÓN", wizard_nickname_hint: "* Puedes usar un apodo.", wizard_btn_ask: "Preguntar", wizard_btn_next: "Siguiente", wizard_btn_prev: "Anterior", wizard_btn_submit: "Enviar", wizard_btn_finish_early: "Guardar", wizard_btn_generate_name: "Generar nombre", wizard_ribbon_greeting: "¡Encantado, {name}!", wizard_title_name: "¿Cómo te llamas?", wizard_desc_name: "Introduce tu nombre", wizard_placeholder_name: "Tu nombre",
    wizard_step2_title: "¿Cuántos años tienes?", wizard_step2_desc: "Grupo de edad", wizard_step2_placeholder: "Edad",
    wizard_step3_title: "¿Estado civil?",
    wizard_marital_solo_title: "Solo", wizard_marital_solo_desc: "Sin pareja ni hijos", wizard_marital_pair_title: "Pareja / Familia", wizard_marital_pair_desc: "Pareja o hijos", wizard_marital_secret_title: "Secreto", wizard_marital_secret_desc: "No lo digo",
    wizard_children_title: "¿Tienes hijos?", wizard_children_desc: "Para consejos sobre escuelas.", wizard_children_yes: "Sí", wizard_children_no: "No", wizard_family_details_title: "Detalles Familiares", wizard_family_count_label: "¿Cuántos?", wizard_family_ages_label: "¿Edades?", wizard_family_ages_hint: "Selecciona todos.", wizard_age_group_0_6: "Guardería (0-6)", wizard_age_group_7_12: "Escuela (7-12)", wizard_age_group_13_17: "Adolescentes (13-17)", wizard_age_group_18: "Adultos (18+)",
    wizard_step4_title: "¿De dónde eres?", wizard_step4_desc: "País de origen", wizard_step4_placeholder: "Nombre del país...", wizard_step4_no_match: "No encontrado", wizard_btn_search_country: "Buscar", wizard_btn_select_region: "Elegir Región", wizard_region_europe: "Europa", wizard_region_americas: "América", wizard_region_asia: "Asia", wizard_region_africa: "África", wizard_region_oceania: "Oceanía", wizard_region_middle_east: "Oriente Medio", wizard_eu_question: "¿Ciudadano UE?", wizard_eu_yes: "Sí", wizard_eu_no: "No",
    wizard_step5_title: "Derecho a trabajar", wizard_permit_full_title: "Ilimitado", wizard_permit_full_desc: "Permanente, Familia, UE", wizard_permit_restricted_title: "Restringido", wizard_permit_restricted_desc: "Vinculado a empleador", wizard_permit_student_title: "Estudiante", wizard_permit_student_desc: "Horas limitadas",
    wizard_step6_title: "Educación", wizard_step6_desc: "¿Tu nivel?", wizard_step6_field_label: "Campo (Opcional)", wizard_step6_field_placeholder: "ej. Ingeniería", wizard_edu_general_title: "General", wizard_edu_general_desc: "Bachillerato.", wizard_edu_applied_title: "Profesional", wizard_edu_applied_desc: "FP o Politécnico.", wizard_edu_uni_title: "Universidad", wizard_edu_uni_desc: "Grado académico.",
    wizard_step7_title: "¿Tu profesión?", wizard_step7_desc: "¿O qué trabajo buscas?", wizard_step7_placeholder: "ej. Enfermero",
    wizard_step8_title: "Finés", wizard_lbl_finnish_level: "Nivel", wizard_lbl_finnish_motivation: "Motivación", wizard_opt_lang_none: "Nada", wizard_opt_lang_basics: "Básico (A1)", wizard_opt_lang_inter: "Intermedio (A2-B1)", wizard_opt_lang_fluent: "Fluido (B2+)", wizard_scale_1_motivation: "Curioso", wizard_scale_5_motivation: "Imparable",
    wizard_step9_title: "Inglés", wizard_opt_lang_en_none: "No", wizard_opt_lang_en_basic: "Básico", wizard_opt_lang_en_working: "Laboral", wizard_opt_lang_en_fluent: "Fluido",
    wizard_step10_title: "Visión", wizard_step10_aspirations_label: "Metas", wizard_step10_aspirations_placeholder: "¿Qué esperas lograr?", wizard_step10_challenges_label: "Desafíos", wizard_step10_challenges_placeholder: "¿Qué te preocupa?",
    wizard_step12_title: "¿Cultura?", wizard_opt_cult_low: "Misterio", wizard_opt_cult_med: "Observando", wizard_opt_cult_high: "Sumergiéndome",
    wizard_step13_title: "¿Ritmo de vida?", wizard_scale_1_life: "Extraño", wizard_scale_5_life: "Como en casa",
    wizard_step14_title: "¿Confianza laboral?", wizard_scale_1_career: "Necesito guía", wizard_scale_5_career: "Tengo un plan",
    wizard_step15_title: "¿Claridad?", wizard_opt_info_none: "Confuso", wizard_opt_info_some: "Aclarandose", wizard_opt_info_high: "Cristalino",
    wizard_step16_title: "¿Qué te alegra?", wizard_opt_excite_career: "Carrera", wizard_opt_excite_life: "Seguridad", wizard_opt_excite_nature: "Naturaleza", wizard_opt_excite_adventure: "Aventura",
    wizard_rating_winter: "Invierno", wizard_rating_thaw: "Deshielo", wizard_rating_growth: "Crecimiento", wizard_rating_bloom: "Floración", wizard_rating_summer: "Verano",
    history_title: "Historial", history_empty: "Vacío.", history_tab_summary: "Resumen", history_tab_transcript: "Chat", history_no_summary: "Sin resumen.", history_generating: "Escribiendo...", history_generating_desc: "En segundo plano.",
    cv_title: "Analizar CV", cv_subtitle: "Pega texto de CV.", cv_placeholder: "Texto...", cv_btn_analyze: "Analizar", cv_btn_processing: "Procesando...", cv_warning_key: "Requiere Clave API.", cv_key_update: "Actualizar", cv_key_required: "Clave Requerida", cv_key_desc: "Para seguridad.", cv_key_placeholder: "Clave...", cv_key_save: "Guardar", cv_alert_success: "Guardado.", cv_alert_error: "Error.", cv_btn_manage_key: "Clave API",
    settings_title: "Ajustes", settings_sect_general: "General", settings_sect_appearance: "Apariencia", settings_sect_data: "Datos", settings_length_label: "Longitud respuesta", settings_theme_label: "Tema", settings_theme_system: "Sistema", settings_theme_light: "Claro", settings_theme_dark: "Oscuro", settings_opt_ask: "Preguntar", settings_opt_short: "Corto", settings_opt_long: "Largo", settings_clear_data: "Borrar datos", settings_clear_data_desc: "Borra todo.", settings_btn_clear: "Borrar todo",
    net_intro: "Bienvenido a Networking. Elige tu camino.",
    net_header: "¿En qué nos enfocamos hoy?",
    net_opt_design: "Comunidad de Diseño",
    net_opt_linkedin: "Estrategia LinkedIn",
    net_opt_hobbies: "Hobbies y Actividades",
    net_opt_parents: "Networking para Padres",
    net_opt_introvert: "Consejos para introvertidos",
    feedback_action: "Dar opinión",
    net_intro_deep: 'Por qué importa el Networking', net_design: 'Comunidad de Diseño', net_parents: 'Networking para Padres', net_introvert: 'Networking sin presión', net_hobbies: 'Hobbies y Networking', net_plan: 'Tu Plan de Acción',
    net_cold_msg: 'El arte del mensaje frío', net_places: 'Lugares de Networking', net_prof_style: 'Estilo Profesional Finlandés',
    net_hackathons: 'Hackathons y Junction', net_slush: 'Slush: La Anti-Conferencia', net_school: 'Networking en la Escuela',

    // Gamified Planner
    quest_level: "Nivel {level} Explorador",
    quest_xp: "{current}/{max} XP para el siguiente nivel",
    quest_tab_board: "Viaje Profesional",
    quest_tab_achievements: "Logros",
    quest_tab_life: "Vida y Bienestar",
    quest_priority_title: "Misiones Prioritarias",
    quest_priority_subtitle: "Elementos guardados para después",
    quest_empty_priority: "No hay misiones prioritarias. ¡Buen trabajo!",
    quest_empty_log: "No hay misiones completadas. ¡Empieza tu viaje!",
    quest_btn_mark_done: "Marcar como hecho",
    quest_btn_read: "Leer Guía",
    quest_achievement_unlocked: "¡Logro Desbloqueado!",
    quest_fun_fact_title: "¿Sabías que?",
    quest_btn_unlock: "Desbloquear y Leer",
    quest_locked_msg: "¡Toca para revelar un secreto!",
    
    // New Rubric Labels
    plan_track_career: "Trayectoria Profesional",
    plan_track_life: "Vida Nórdica",
    plan_step_completed: "Completado",
    plan_step_locked: "Bloqueado",
    plan_step_available: "Disponible",
    plan_btn_return: "Volver al Plan"
  },
  wiki: {
    titles: {
      foundation: 'Lo Esencial', job_strategy: 'Estrategia de Búsqueda', workplace: 'Cultura Laboral', industries: 'Guías de Industria', life: 'Vida y Equilibrio',
      identity: 'Identidad y Permisos', security: 'Seguridad Social', market: 'El Mercado', tools: 'Herramientas', rights: 'Derechos',
      social: 'Rituales Sociales', norms: 'Normas Profesionales', specialist: 'Roles de Especialista', hands_on: 'Trabajo Manual', housing: 'Vivienda y Transporte',
      family: 'Apoyo Familiar', language: 'Idioma',
      social_unemployment: 'Beneficios de Desempleo', social_housing: 'Subsidio de Vivienda', social_pension: 'Pensiones', social_kela_card: 'Tarjeta Kela', social_health: 'Sanidad Pública',
      bureaucracy_dvv: 'DVV e ID Personal', bureaucracy_migri: 'Inmigración (Migri)', bureaucracy_tax: 'Tarjeta de Impuestos', bureaucracy_bank: 'Cuenta Bancaria',
      job_te_office: 'Oficina TE', job_portals: 'Portales de Empleo', job_entrepreneurship: 'Emprendimiento', job_networking: 'Networking',
      job_cover_letter: 'Carta de Presentación', job_interview: 'Entrevista', job_recognition: 'Reconocimiento de Títulos', job_cv_tips: 'CV Finlandés',
      work_contract: 'Contrato de Trabajo', work_hours: 'Horas de Trabajo', work_holidays: 'Vacaciones', work_unions: 'Sindicatos', work_probation: 'Periodo de Prueba',
      culture_meetings: 'Reuniones', culture_feedback: 'Feedback', culture_names: 'Nombres', culture_punctuality: 'Puntualidad', culture_coffee: 'Pausas para Café',
      culture_afterwork: 'Afterwork', culture_sauna: 'Sauna', culture_smalltalk: 'Silencio', culture_party: 'Fiestas de Empresa',
      prof_engineering: 'Ingeniería', prof_business: 'Negocios', prof_it: 'IT y Tecnología', prof_health: 'Salud', prof_service: 'Servicios',
      housing_contracts: 'Contratos de Alquiler', housing_finding: 'Buscar Piso', housing_utilities: 'Suministros', housing_recycling: 'Reciclaje', housing_sauna: 'Lavandería y Sauna',
      family_school: 'Escuela', family_daycare: 'Guardería', family_activities: 'Actividades', family_winter: 'Niños e Invierno', family_safety: 'Seguridad',
      net_culture: 'La manera finlandesa', net_linkedin: 'Estrategia de LinkedIn', net_hidden: 'Mercado Oculto', net_volunteering: 'Voluntariado'
    },
    articles: {
      'guide_start': { title: '¡Bienvenido a Finlandia! 🇫🇮', summary: 'Finlandia funciona a base de confianza, silencio y café.', content: `# Tu Guía de Supervivencia\n\n**La Filosofía:**\nFinlandia funciona a base de confianza, silencio y café. Es una sociedad donde los sistemas funcionan, pero debes saber cómo usarlos.\n\n### Cómo usar esta app\n1. **Lee:** Explora las guías sobre burocracia y cultura laboral.\n2. **Chat:** Pregunta al Asistente de IA sobre tu situación específica.\n3. **Perfil:** Mantén tu información actualizada para que los consejos sean precisos.\n\n¡*Sisu* (Agallas) es todo lo que necesitas!` },
      'net_culture': {
        title: 'Networking: La manera finlandesa',
        summary: 'Los finlandeses conectan haciendo cosas juntos, no con charlas triviales. La confianza lo es todo.',
        content: `### El Espíritu "Talkoot"\nEl networking en Finlandia rara vez trata de repartir tarjetas en un cóctel. Se trata de **trabajar juntos**.\n\n* **Voluntariado:** Únete al equipo de un evento (Slush, festivales locales). Cuando trabajas codo a codo con un finlandés, construyes confianza. La confianza lleva a recomendaciones laborales.\n* **Asociaciones:** Finlandia tiene una asociación (yhdistys) para todo. Encuentra la de tu profesión.`
      },
      'net_intro_deep': {
        title: 'Por qué importa el Networking',
        summary: 'La mayoría de los trabajos están ocultos. El networking es la clave.',
        content: `# El Mercado Oculto\n\nEn Finlandia, la **confianza** juega un papel enorme. Los empleadores quieren saber quién responde por ti. Por eso, muchos trabajos nunca llegan a los portales públicos.\n\nEl mercado oculto contiene el **70-80 por ciento** de las vacantes reales en Finlandia.`
      },
      'net_linkedin': {
        title: 'Estrategia de LinkedIn',
        summary: 'LinkedIn es el principal motor de búsqueda para reclutadores en Finlandia.',
        content: `### Tu Cara Digital\n* **Palabras Clave:** Los reclutadores buscan habilidades, no títulos. Usa "Java", "Gestión de Proyectos" en tu titular.\n* **Ubicación:** Configúrala en Finlandia. Si estás fuera, cámbiala a "Helsinki" para aparecer en búsquedas locales.\n* **Open to Work:** El banner verde es culturalmente aceptado aquí y muestra motivación.`
      },
      'net_hidden': {
        title: 'Hackeando el Mercado Oculto',
        summary: '70-80% de los trabajos no se anuncian. Tienes que encontrarlos.',
        content: `### Piilotyöpaikat (Trabajos Ocultos)\nLas empresas a menudo no anuncian porque contratar es caro y lento.\n\n1. **Mapa de Empresas:** Haz una lista de 20 empresas que te gusten.\n2. **Candidatura Abierta (Avoin hakemus):** Envía un correo al Jefe de Equipo directamente. "He seguido su trabajo en X. Tengo habilidades en Y. ¿Podríamos tomar un café de 15 minutos?"\n3. **Entrevistas Informativas:** Pregunta a la gente sobre su trabajo, no *por* un trabajo.`
      },
      'net_volunteering': {
        title: 'Voluntariado',
        summary: 'La forma más rápida de integrarse y probar habilidades.',
        content: `### ¿Por qué ser voluntario?\n1. **Idioma:** Un entorno de baja presión para practicar finés.\n2. **Referencias:** Obtienes una referencia local que puede avalar tu ética de trabajo.\n3. **Red:** Conoces gente activa.\n\n### ¿Dónde?\nCruz Roja, eventos de startups, clubes deportivos, bibliotecas.`
      },
      'net_school': {
        title: 'Networking mientras estudias',
        summary: 'La escuela es tu primera red profesional en Finlandia.',
        content: `# La Ventaja del Estudiante\n\nEstudiar es la mejor manera de construir una red. Tus compañeros son tus futuros colegas.\n\n### Estrategia\nTrata cada día de prácticas como una entrevista de trabajo.`
      },
      'net_hackathons': {
        title: 'Hackathons y Eventos',
        summary: 'Junction y Slush son oportunidades de oro.',
        content: `# Eventos Tecnológicos\n\n* **Junction:** El hackathon líder de Europa.\n* **Slush:** El evento de startups. Ser voluntario aquí abre puertas.`
      },
      'net_slush': {
        title: 'Slush y Startups',
        summary: 'Ser voluntario en Slush es una forma legendaria de entrar en el círculo.',
        content: `# Slush\n\nCelebrado en Helsinki en noviembre. Es oscuro, ruidoso y lleno de láseres. Ser voluntario prueba una actitud "can-do" que los finlandeses adoran.`
      },
      'net_cold_msg': {
        title: 'El arte del mensaje frío',
        summary: 'Cómo acercarse a la gente sin ser molesto.',
        content: `# Acercarse a Desconocidos\n\nLos finlandeses están ocupados pero son serviciales. Sé breve.\n\n### La Plantilla\n"Hola [Nombre], vi tu post sobre [Tema]. Soy especialista en [Habilidad] mudándome a Finlandia. Me gustaría hacerte una pregunta rápida sobre [Detalle]. ¿Tendrías 10 min para un café virtual?"`
      },
      'net_parents': {
        title: 'Networking para Padres',
        summary: 'Usa tu ritmo diario para construir conexiones.',
        content: `# Networking para Padres Ocupados\n\n* **Diplomacia del Parque:** Si vas al mismo parque a la misma hora, verás a los mismos padres.\n* **Eventos de Guardería:** Participa en los "talkoot" (días de voluntariado). Ganas respeto masivo.`
      },
      'net_introvert': {
        title: 'Networking de baja presión',
        summary: 'No necesitas ser ruidoso. Finlandia es amigable con los introvertidos.',
        content: `# A tu manera\n\n1. **Uno a Uno:** Los finlandeses prefieren conversaciones profundas.\n2. **Comunidades Online:** Únete a grupos de Discord o Slack de tu industria.`
      },
      'net_hobbies': {
        title: 'Hobbies y Networking suave',
        summary: 'Únete a actividades locales para conocer gente de forma natural.',
        content: `# Conoce gente naturalmente\n\nLos finlandeses se unen a través de actividades compartidas.\n\n* **Kansalaisopisto:** Toma un curso barato de cerámica o idioma.\n* **Deportes:** Floorball o fútbol. Unirse a un grupo de principiantes crea un vínculo instantáneo.`
      },
      'bureaucracy_dvv': { title: 'DVV e ID Personal', summary: 'Obtén tu Código de Identidad Personal para existir legalmente.', content: `# DVV 🆔\n\n**Prioridad: INMEDIATA**\n\n### La Misión\nExistir legalmente. Obtén tu **ID Personal**.\n\n### Por qué?\nBanco, teléfono, impuestos.` },
      'bureaucracy_migri': { title: 'Migri', summary: 'Permiso de Residencia y consejos.', content: `# Migri 🛂\n\n### La Misión\nPermiso de Residencia.\n\n### Consejos\n* **Reserva temprano:** Las colas son largas.\n* **Fast Track:** Para especialistas.` },
      'bureaucracy_tax': { title: 'Tarjeta de Impuestos', summary: 'Sin tarjeta = 60% impuestos.', content: `# Verokortti 💳\n\n**Regla:** Sin tarjeta = 60% impuestos.\n\n### Proceso\n1. Entra a **OmaVero**.\n2. Estima ingresos.\n3. Descarga PDF.\n4. Envía al jefe.` },
      'social_unemployment': { title: 'Desempleo', summary: 'Regístrate en TE el primer día.', content: `# ¿Sin trabajo? 📉\n\n### 1. Regístrate\nEn la **Oficina TE** el primer día.\n\n### 2. Pagadores\n* **Kela:** Básico.\n* **Fondo:** Basado en ingresos (si eres miembro).` },
      'social_housing': { title: 'Subsidio de Vivienda', summary: 'Apoyo de Kela para alquileres.', content: `# Asumistuki 🏠\n\nSi los ingresos son bajos, Kela ayuda con el alquiler.` },
      'social_pension': { title: 'Pensiones', summary: 'Pensión basada en ingresos.', content: `# Pensión 👴\n\nSe acumula con el trabajo. Exportable a la UE.` },
      'social_kela_card': { title: 'Tarjeta Kela', summary: 'Seguro de salud nacional.', content: `# Tarjeta Kela 🏥\n\nMuéstrala en la farmacia para descuentos.` },
      'social_health': { title: 'Salud', summary: 'Pública vs Ocupacional.', content: `# Salud ⚕️\n\n1. **Pública:** Barata, con espera.\n2. **Ocupacional:** Gratis para empleados, rápida.` },
      'job_market_overview': { title: 'Mercado Laboral', summary: '70-80% trabajos ocultos.', content: `# Mercado Oculto 📉\n\n**La mayoría de trabajos no se anuncian.**\n\n### Estrategias\n* **Red:** Amigos.\n* **Directo:** Email a empresas.` },
      'job_te_office': { title: 'Oficina TE', summary: 'Obligatorio para beneficios.', content: `# TE-toimisto 🏢\n\nRegístrate para beneficios y cursos.` },
      'job_portals': { title: 'Portales', summary: 'LinkedIn y Oikotie.', content: `# Dónde buscar 🔍\n\n* **LinkedIn:** Profesionales.\n* **Oikotie:** El más grande.\n* **The Hub:** Startups.` },
      'job_entrepreneurship': { title: 'Emprendimiento', summary: 'Dinero para empezar.', content: `# Starttiraha 🚀\n\nSubvención para nuevos empresarios (6-12 meses).` },
      'job_networking': { title: 'Networking', summary: 'Sé directo.', content: `# Networking 🤝\n\nEl voluntariado es clave.` },
      'job_cover_letter': { title: 'Carta de Presentación', summary: 'Corta y al grano.', content: `# Cover Letter 📝\n\nMáx 1 página. Enfócate en el valor que aportas.` },
      'job_interview': { title: 'Entrevista', summary: 'Honestidad ante todo.', content: `# Entrevista 👔\n\nSi no sabes, dilo. El silencio está bien.` },
      'job_recognition': { title: 'Reconocimiento', summary: 'Para médicos/maestros.', content: `# Valvira 🎓\n\nNecesario para profesiones reguladas.` },
      'job_cv_tips': { title: 'CV Finlandés', summary: 'Foto y hechos.', content: `# CV 📄\n\nFoto estándar. Sé conciso.` },
      'work_contract': { title: 'Contrato', summary: 'Siempre escrito.', content: `# Contrato ✍️\n\nRevisa el convenio colectivo (TES).` },
      'work_hours': { title: 'Horas', summary: '37.5h semana.', content: `# Horario ⏰\n\nRespeto al tiempo libre.` },
      'work_holidays': { title: 'Vacaciones', summary: '4-5 semanas.', content: `# Vacaciones ☀️\n\nJulio es sagrado.` },
      'work_unions': { title: 'Sindicatos', summary: 'Recomendado.', content: `# Sindicatos 🛡️\n\nProtección legal y mejor paro.` },
      'work_probation': { title: 'Prueba', summary: '4-6 meses.', content: `# Koeaika ⏳\n\nDespido inmediato posible.` },
      'culture_meetings': { title: 'Reuniones', summary: 'Puntuales y eficientes.', content: `# Reuniones 📅\n\n**Puntuales.** Agenda estricta.` },
      'culture_feedback': { title: 'Feedback', summary: 'Directo.', content: `# Feedback 🗣️\n\nLos finlandeses son directos. No es personal.` },
      'culture_names': { title: 'Nombres', summary: 'Informal.', content: `# Nombres 👋\n\nUsa el primer nombre con todos.` },
      'culture_punctuality': { title: 'Puntualidad', summary: 'Sagrada.', content: `# Puntualidad ⌚\n\nNo llegues tarde.` },
      'culture_coffee': { title: 'Café', summary: 'Ritual.', content: `# Kahvi ☕\n\nSocializa con el equipo.` },
      'culture_afterwork': { title: 'Afterwork', summary: 'Viernes.', content: `# AW 🍻\n\nRelax informal.` },
      'culture_sauna': { title: 'Sauna', summary: 'Igualdad.', content: `# Sauna 🧖\n\nDesnudez natural. Negocios a veces.` },
      'culture_smalltalk': { title: 'Silencio', summary: 'Acéptalo.', content: `# Silencio 🤫\n\nNo hace falta rellenarlo.` },
      'culture_party': { title: 'Fiesta', summary: 'Pikkujoulut.', content: `# Navidad 🎄\n\nFiesta de empresa loca.` },
      'prof_engineering': { title: 'Ingeniería', summary: 'Inglés común.', content: `# Ingeniería ⚙️\n\nKone, Nokia. Basado en hechos.` },
      'prof_business': { title: 'Negocios', summary: 'Finés necesario.', content: `# Negocios 💼\n\nVentas internacionales o startups.` },
      'prof_it': { title: 'IT', summary: 'Fácil con inglés.', content: `# IT 💻\n\nInglés estándar. Wolt, Supercell.` },
      'prof_health': { title: 'Salud', summary: 'Finés obligatorio.', content: `# Salud ⚕️\n\nLicencia y idioma fluido.` },
      'prof_service': { title: 'Servicios', summary: 'Entrada común.', content: `# Servicios 🧹\n\nLimpieza y cocina.` },
      'housing_contracts': { title: 'Alquiler', summary: 'Depósito.', content: `# Contrato 🏠\n\nSeguro obligatorio.` },
      'housing_finding': { title: 'Buscar', summary: 'Rápido.', content: `# Buscar 🔎\n\nOikotie. Sé rápido.` },
      'housing_utilities': { title: 'Suministros', summary: 'Luz aparte.', content: `# Luz ⚡\n\nContrata tu electricidad.` },
      'housing_recycling': { title: 'Reciclaje', summary: 'Serio.', content: `# Reciclaje ♻️\n\nSepara todo. Botellas = dinero.` },
      'housing_sauna': { title: 'Sauna', summary: 'Compartida.', content: `# Edificio 🧺\n\nReserva tu turno.` },
      'family_school': { title: 'Escuela', summary: 'Gratis.', content: `# Escuela 🎒\n\nDesde los 7 años.` },
      'family_daycare': { title: 'Guardería', summary: 'Derecho.', content: `# Guardería 🧸\n\nBarata y buena.` },
      'family_activities': { title: 'Actividades', summary: 'Bibliotecas.', content: `# Ocio ⚽\n\nBibliotecas y deporte.` },
      'family_winter': { title: 'Invierno', summary: 'Ropa.', content: `# Ropa ❄️\n\nCapas y reflectores.` },
      'family_safety': { title: 'Seguridad', summary: 'Alta.', content: `# Seguridad 🚲\n\nNiños independientes.` },
      'culture_essentials': { title: 'Valores', summary: 'Confianza y silencio.', content: `# Valores 🤫\n\n1. **Confianza:** Cumple.\n2. **Silencio:** Es oro.` }
    }
  }
};
