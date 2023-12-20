<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::whereNull('deleted_at')->get();
        return view('students.index', compact('students'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'class' => 'required',
        ]);

        Student::create($request->all());

        return response()->json(['success' => 'Student added successfully.']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'class' => 'required',
            'status' => 'required',
        ]);

        $student = Student::findOrFail($id);
        $student->update($request->all());

        return response()->json(['success' => 'Student updated successfully.']);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);

        DB::transaction(function () use ($student) {
            $student->delete();
        });

        return response()->json(['success' => 'Student deleted successfully.']);
    }
}