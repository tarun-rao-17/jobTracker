import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  jobs: any[] = [];

  // 👇 form fields
  company = '';
  position = '';
  status = 'Applied';
  jobType = 'Full-time';
  notes = '';
  filterStatus = 'All';
  filteredJobs: any[] = [];
  searchText = '';

  constructor(
    private jobService: JobService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadJobs();
  }

 loadJobs() {
  this.jobService.getJobs().subscribe(data => {
    this.jobs = data;
    this.applyFilter();
  });
}
applyFilter() {
  let tempJobs = this.jobs;

  // 1️⃣ Filter by status
  if (this.filterStatus !== 'All') {
    tempJobs = tempJobs.filter(
      job => job.status === this.filterStatus
    );
  }

  // 2️⃣ Filter by company search
  if (this.searchText.trim() !== '') {
    tempJobs = tempJobs.filter(job =>
      job.company
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  this.filteredJobs = tempJobs;
}

  createJob() {
    const jobData = {
      company: this.company,
      position: this.position,
      status: this.status,
      jobType: this.jobType,
      notes: this.notes
    };

    this.jobService.createJob(jobData).subscribe(() => {
      this.loadJobs(); // refresh list
      this.company = '';
      this.position = '';
      this.notes = '';
    });
  }

  editingJobId: string | null = null;

startEdit(job: any) {
  this.editingJobId = job._id;
}

saveJob(job: any) {
  const updatedData = {
    status: job.status,
    jobType: job.jobType,
    notes: job.notes
  };

  this.jobService.updateJob(job._id, updatedData).subscribe(() => {
    this.editingJobId = null;
    this.loadJobs();
  });
}

cancelEdit() {
  this.editingJobId = null;
  this.loadJobs(); // reset changes
}

  deleteJob(id: string) {
    this.jobService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(job => job._id !== id);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  getCount(status: string) {
  return this.filteredJobs.filter(job => job.status === status).length;
}
}