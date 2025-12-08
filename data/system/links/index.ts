
import { AppView } from '../../../types';
import * as SCENES from '../scenes';

/**
 * NAVIGATION MAP
 * 
 * This file maps "Trigger Elements" (Buttons/Links) to "Destinations" (AppViews).
 * Future updates to navigation logic should consult this map.
 * 
 * Structure:
 * [Source_Element_ID]: Target_AppView
 */

export const NAV_LINKS: Record<string, AppView> = {
  // LANDING LINKS
  [SCENES.LANDING.BTN_QUIZ]: AppView.QUIZ,
  [SCENES.LANDING.BTN_CONTINUE]: AppView.DASHBOARD,
  [SCENES.LANDING.BTN_CHAT]: AppView.CHAT,
  [SCENES.LANDING.BTN_BROWSE]: AppView.WIKI,

  // DASHBOARD LINKS
  [SCENES.DASHBOARD.BTN_GUIDE]: AppView.WIKI,
  [SCENES.DASHBOARD.BTN_CHAT]: AppView.CHAT,
  [SCENES.DASHBOARD.BTN_HISTORY]: AppView.HISTORY,
  [SCENES.DASHBOARD.BTN_CV]: AppView.CV_IMPORT,
  [SCENES.DASHBOARD.BTN_SETTINGS]: AppView.SETTINGS,
  
  // GLOBAL NAV LINKS
  [SCENES.GLOBAL_NAV.LINK_KB]: AppView.WIKI,
  [SCENES.GLOBAL_NAV.LINK_CHAT]: AppView.CHAT,
  [SCENES.GLOBAL_NAV.LINK_PLAN]: AppView.PROFILE,
  [SCENES.GLOBAL_NAV.LOGO]: AppView.LANDING,

  // SHARED / NAVBAR (Mapped via component IDs usually, but conceptual links here)
  'nav_profile': AppView.PROFILE,
  'nav_dashboard': AppView.DASHBOARD,
  'btn_profile_take_quiz': AppView.QUIZ // Explicit mapping for the guest state button
};
