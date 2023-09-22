#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, WindowEvent};
use window_shadows::set_shadow;

#[tauri::command]
fn open_external_url(url: &str) {
    open::that(url).expect("Failed to open url in the browser.");
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");

            window.on_window_event(|event| {
                match event {
                    WindowEvent::Resized(..) => {
                        std::thread::sleep(std::time::Duration::from_millis(1))
                    }
                    _ => {}
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_external_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}