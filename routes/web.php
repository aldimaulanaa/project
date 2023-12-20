<?php

use App\Http\Controllers\StudentController;

Route::get('/', [StudentController::class, 'index']);
Route::post('/students/store', [StudentController::class, 'store']);
Route::put('/students/update/{id}', [StudentController::class, 'update']);
Route::delete('/students/delete/{id}', [StudentController::class, 'destroy']);
