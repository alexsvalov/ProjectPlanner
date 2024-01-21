using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// План производства
/// </summary>
public partial class PlanProduct
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Версия плана
    /// </summary>
    public int VersionNum { get; set; }

    /// <summary>
    /// Дата создания плана
    /// </summary>
    public DateOnly CreateDate { get; set; }

    public bool? IsActive { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<PlanCompose> PlanComposes { get; set; } = new List<PlanCompose>();
}
